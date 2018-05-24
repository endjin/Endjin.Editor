/// <reference path="IViewAdapter.ts" />
/// <reference path="../Model/IModel.ts" />
/// <reference path="../Model/Models/UnclassifiedContent/TextModel.ts" />

namespace Endjin.Editor.View {
    /** The engine used by the view adpater and commands to respond to and manipulate the views. */
    export class ViewEngine {
        private modelToViewAdapter: Map<string, IViewAdapter>;
        private viewToModel: Map<Node, Model.IModel>;
        private modelToView: Map<string, Node>;
        private viewAdapters: Array<IViewAdapter>;
        private modelToViewEventHandlers: Map<string, Array<IViewEventHandler>>;

        /**
         * Creates an instance of the ViewEngine
         */
        constructor(private editor: IEditor) {
            this.viewAdapters = new Array<IViewAdapter>();
            this.modelToViewAdapter = new Map<string, IViewAdapter>();
            this.modelToView = new Map<string, Node>();
            this.viewToModel = new Map<Node, Model.IModel>();
            this.modelToViewEventHandlers = new Map<string, Array<IViewEventHandler>>();
        }

        /**
         * Destroy the view engine, releasing any resources
         * */
        destroy() {
            this.modelToViewEventHandlers.forEach((l) => {
                l.forEach((v) => v.destroy());
            });
        }

        /**
         * Destroy models which are no longer in use
         * @param models - the models to destroy
         */
        destroyModels(...models: Model.IModel[]) {
            models.forEach((m) => {
                m.forEachChild((c) => {
                    // Destroy the whole tree
                    this.destroyModels(c);
                });
                let l = this.modelToViewEventHandlers.get(m.id) || [];
                l.forEach((v) => v.destroy());
                this.modelToViewEventHandlers.delete(m.id);
                let view = this.modelToView.get(m.id) || null;
                this.modelToView.delete(m.id);
                if (view !== null) {
                    this.viewToModel.delete(view);
                }
            });
        }

        /**
         * Add a view event handler
         * @param handler - the handler to add
         * @param model - the model for which the handler it to be added
         */
        addViewEventHandler(handler: IViewEventHandler, model: Model.IModel) {
            let view = this.getViewForModel(model) as HTMLElement;

            let handlers = this.modelToViewEventHandlers.get(model.id) || null;
            if (handlers === null) {
                handlers = [];
                this.modelToViewEventHandlers.set(model.id, handlers);
            }

            handlers.push(handler);
            handler.attachToView(view);
            handler.editor = this.editor;
        }

        /**
         * Render a model to a node
         * @param model - The model to render
         * @returns - The HTML node representing the model
         */
        render(model: Model.IModel): Node {
            let existingView = this.getViewForModel(model);
            let view: Node;
            if (model.contentType === Model.TextModel.ContentType) {
                // special case for text, which is a node not a real HTMLElement
                if (existingView !== null) {
                    view = existingView;
                    let textNode = <Text>view;
                    textNode.textContent = (<Model.TextModel>model).textRun;
                } else {
                    view = document.createTextNode((<Model.TextModel>model).textRun);
                }
            } else {
                let viewAdapter = this.getViewAdapterForModel(model);
                view = viewAdapter.render(model, <HTMLElement>existingView);
                if (model.isEditable) {
                    if (model !== this.editor.document.root) {
                        (<HTMLElement>view).removeAttribute("contenteditable");
                    }
                } else {
                    (<HTMLElement>view).contentEditable = "false";
                }
            }
            if (existingView !== view) {
                if (existingView !== null) {
                    this.viewToModel.delete(existingView);
                }
                this.viewToModel.set(view, model);
                this.modelToView.set(model.id, view);
            }
            return view;
        }

        /**
         * Render a model, and append it to the view
         * @param view - the view to which to append the child view
         * @param model - the model to render to the child view
         */
        renderAndAppend(view: Node, model: Model.IModel): void {
            let childView = this.render(model);
            view.appendChild(childView);
        }

        /**
         * Determines if there is a view adapter that can parse the
         * specified view
         * @param view - the view to parse
         * @returns - true if the view can be parsed by a view adapter
         */
        canParse(view: Node): boolean {
            if (view.nodeName === "#text") {
                return true;
            }

            if (view.nodeName === "#comment" || view.nodeName === "#document") {
                return false;
            }

            return this.viewAdapters.some((v) => {
                return v.canParseView(<HTMLElement>view);
            });
        }

        /**
         * Parse the children of a view into a model
         * @param model - the model into which to parse the children
         * @param view - the view whose chidlren are to be parsed
         * @result - true if the model was parsed fully, false if any children failed to parse
         */
        parseChildren(model: Model.IModel, view: HTMLElement): boolean {
            let totalSuccess: boolean = true;
            for (let i = 0; i < view.childNodes.length; ++i) {
                let node = view.childNodes[i];
                if (this.canParse(node)) {
                    let child = this.parse(node);
                    let acceptedChild = model.acceptChild(model.childCount, child);
                    if (acceptedChild === null) {
                        console.log("Failed to accept child");
                    }
                    totalSuccess = totalSuccess && (acceptedChild !== null);
                }
                else {
                    totalSuccess = false;
                }
            }

            return totalSuccess;
        }

        /**
         * Parse a view to a model
         * @param view - the view to parse
         * @returns - the model for the view
         * @throws - if the model cannot be parsed by any adapters
         */
        parse(view: Node): Model.IModel {
            // We sort the matched adapters highest to lowest priority
            if (view.nodeName === "#text") {
                return new Model.TextModel(view.textContent || "");
            }

            if (view.nodeName === "#comment" || view.nodeName === "#document") {
                throw new Error(`Unable to parse a ${view.nodeName}`);
            }

            let htmlElement = <HTMLElement>view;

            let matchedAdapters = this.viewAdapters.filter((v) => {
                return v.canParseView(htmlElement);
            }).sort((a, b) => a.priority > b.priority ? -1 : a.priority === b.priority ? 0 : 1);

            if (matchedAdapters.length === 0) {
                throw new Error("Unable to parse the specified view.");
            }

            // use the first match
            return matchedAdapters[0].parseView(htmlElement);
        }

        /**
         * Find the model that contains the specified view
         * @param view - the view
         * @returns - the nearest containing model, or null if no model was found
         */
        findContainingModel(view: Node): Endjin.Editor.Model.IModel | null {
            let current: Node | null = view;
            let previous: Node | null = view;
            while (current !== null && !this.viewToModel.has(current)) {
                previous = current;
                current = current.parentElement;
            }

            if (current === null) {
                return null;
            }

            return this.viewToModel.get(current) || null;
        }

        /**
         * Register a view adapter
         * @param modelType - the type of the model
         * @param viewAdapter - the view adapter
         */
        addViewAdapter(modelType: string, viewAdapter: IViewAdapter): void {
            if (this.modelToViewAdapter.has(modelType)) {
                throw new Error(`A view adapter has already been registered for '${modelType}'`)
            }

            this.modelToViewAdapter.set(modelType, viewAdapter);
            this.viewAdapters.push(viewAdapter);
            viewAdapter.viewEngine = this;
        }

        /**
         * Deregister a view adapter
         * @param modelType - the type of the model
         * @returns - true if the view adapter was removed
         */
        deleteViewAdapter(modelType: string): boolean {
            let viewAdapter = this.modelToViewAdapter.get(modelType) || null;
            if (viewAdapter === null) {
                return false;
            }
            // Must exist, because of the nullness test above.
            let index = this.viewAdapters.indexOf(viewAdapter);
            this.viewAdapters.splice(index, 1);
            return this.modelToViewAdapter.delete(modelType);
        }

        /**
         * Get the current selection from the view
         * */
        getSelection(): Model.Selection | null {
            let sel = document.getSelection();
            if (sel.rangeCount === 0) {
                return null;
            }

            let range = sel.getRangeAt(0);
            let selectionScope = this.findContainingModel(range.commonAncestorContainer);
            let startModel = this.findContainingModel(range.startContainer);
            let endModel = this.findContainingModel(range.endContainer);

            if (startModel === null || endModel === null || selectionScope === null) {
                // The selection extends outside the editor, so nothing doing here
                return null;
            }

            return new Model.Selection(selectionScope, new Model.Location(startModel, range.startOffset), new Model.Location(endModel, range.endOffset));
        }

        /**
         * Set the selection in the current view
         * @param selection - the selection to set, or null to clear the selection
         */
        setSelection(selection: Model.Selection | null): boolean {
            this.selectionTimeoutHandle = null;
            let sel = document.getSelection();
            sel.removeAllRanges();
            if (selection === null) {
                return true;
            }
            let range = document.createRange();
            let startNode = this.getViewForModel(selection.selectionStart.model);
            if (startNode === null) {
                return false;
            }

            range.setStart(startNode, selection.selectionStart.index);

            let endNode = this.getViewForModel(selection.selectionEnd.model);
            if (endNode === null) {
                return false;
            }
            range.setEnd(endNode, selection.selectionEnd.index);
            sel.addRange(range);
            return true;
        }

        /**
         * Get the view adapter for a particular model
         * @param model - the model for which to get the view adapter
         * @returns - the instance of the view adapter for the model
         */
        private getViewAdapterForModel(model: Model.IModel): IViewAdapter {
            let viewAdapter = this.modelToViewAdapter.get(model.contentType);

            if (!viewAdapter) {
                throw new Error(`No view adapter found for '${model.contentType}'`);
            }

            return viewAdapter;
        }

        /**
         * Get the view for a particular model
         * @param model - the model for which to get the view
         * @returns - the instance of the view for the model
         */
        private getViewForModel(model: Model.IModel): Node | null {
            return this.modelToView.get(model.id) || null;
        }
    }
}