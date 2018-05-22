/// <reference path="../View/ViewEngine.ts" />
/// <reference path="../Model/Document.ts" />
/// <reference path="../Model/Selection.ts" />
/// <reference path="../Model/KeyboardShortcuts/KeyboardShortcutEngine.ts" />
/// <reference path="../View/RegisterViewAdapters.ts" />
/// <reference path="../View/RegisterViewEventHandlers.ts" />

namespace Endjin.Editor {
    export interface IEditor {
        document: Model.Document;
        keyboardShortcuts: Model.KeyboardShortcutEngine;
        selection: Model.Selection | null; 
        executeCommand(command: Model.IDocumentCommand): void;
        executeBatch(batch: Model.CommandBatch): void;
        destroyModels(...models: Array<Model.IModel>): void;
    }

    /** The engine used by the view adpater and commands to respond to and manipulate the views. */
    class EditorImplementation implements IEditor {
        static editors: Array<EditorImplementation> = [];
        private executingBatch: boolean = false;
        private queuedSelection: Model.Selection | null = null;

        document: Model.Document;
        viewEngine: View.ViewEngine;
        keyboardShortcuts: Model.KeyboardShortcutEngine;

        get selection(): Model.Selection | null {
            return this.viewEngine.getSelection();
        }

        set selection(value: Model.Selection | null) {
            if (this.executingBatch) {
                this.queuedSelection = value;
            } else {
                this.viewEngine.setSelection(value);
            }
        }

        constructor(public rootView: HTMLElement, initializeBeforeParse?: (viewEngine: View.ViewEngine) => void, initializeAfterRender?: (viewEngine: View.ViewEngine, document: Model.Document) => void, document?: Model.Document) {
            this.keyboardShortcuts = new Model.KeyboardShortcutEngine(this);

            if (rootView.hasAttribute("data-endjin-editor")) {
                throw new Error(`There is already an editor for the view.`);
            }

            this.viewEngine = new View.ViewEngine(this);

            View.registerDefaultAdapters(this.viewEngine);

            if (initializeBeforeParse) {
                initializeBeforeParse(this.viewEngine);
            }

            this.document = document || this.createDocument();

            this.render();

            View.registerDefaultHandlers(this.viewEngine, this.document);

            if (initializeAfterRender) {
                initializeAfterRender(this.viewEngine, this.document);
            }

            EditorImplementation.editors.push(this);
        }

        destroy(): boolean {
            let editorIndex = EditorImplementation.editors.indexOf(this);
            if (editorIndex === -1) {
                return false;
            }
            EditorImplementation.editors.splice(editorIndex, 1);
            this.rootView.removeAttribute("data-endjin-editor");
            this.rootView.removeAttribute("contenteditable");
            this.viewEngine.destroy();
            return true;
        }

        destroyModels(...models: Array<Model.IModel>): void {
            this.viewEngine.destroyModels(...models);
        }

        executeCommand(command: Model.IDocumentCommand): void {
            return this.executeCommands([command]);
        }

        executeCommands(commands: Array<Model.IDocumentCommand>): void {
            return this.executeBatch(new Model.CommandBatch(commands));
        }

        executeBatch(batch: Model.CommandBatch): void {
            try {
                this.executingBatch = true;
                let affectedModels = batch.execute();
                affectedModels.forEach((m) => {
                    // Re-render the affected elements. Note that the affected element is *always* a pre-existing node in the tree
                    this.viewEngine.render(m);
                });
            } finally {
                this.executingBatch = false;
                if (this.queuedSelection !== null) {
                    this.selection = this.queuedSelection;
                    this.queuedSelection = null;
                }
            }
        }

        private createDocument(): Model.Document {
            if (!this.viewEngine.canParse(this.rootView)) {
                throw new Error("Unable to parse the root view - it is not valid HTML5 content.");
            }

            let rootModel = this.viewEngine.parse(this.rootView);
            let document = new Model.Document();
            document.root = rootModel;
            return document;
        }

        private render(): void {
            let renderedView = this.viewEngine.render(this.document.root);
            let parent = this.rootView.parentElement;
            if (parent === null) {
                throw new Error("The root view must have a parent.");
            }
            parent.replaceChild(renderedView, this.rootView);
            this.rootView = <HTMLElement>renderedView;
            this.rootView.contentEditable = "true";
            this.rootView.setAttribute("data-endjin-editor", "true");

        }
    }

    /**
     * Create an editor for the supplied HTML text, and append it to the element specified by id
     * @param id
     * @param html
     */
    export function createAndInsert(id: string, html: string): IEditor {
        let parent = document.getElementById(id);
        if (parent === null) {
            throw new Error(`Unable to find the element with ID '#${id}'`)
        }

        let wrapper = document.createElement("div");
        wrapper.innerHTML = html;

        if (wrapper.childElementCount !== 1) {
            throw new Error("The supplied HTML has more than one root child element");
        }

        let view = wrapper.firstElementChild as HTMLElement;

        parent.innerHTML = "";
        parent.appendChild(view);


        return new EditorImplementation(parent);
    }

    /**
     * Create an editor in-place for the element with the specified ID
     * @param id
     */
    export function create(id: string): IEditor {
        let view = document.getElementById(id);
        if (view === null) {
            throw new Error(`Unable to find the element with ID '#${id}'`)
        }

        return new EditorImplementation(view);
    }

    export function getEditorFor(element: HTMLElement): IEditor | null {
        let current: HTMLElement | null = element;
        while (current !== null && !current.hasAttribute("data-endjin-editor")) {
            current = current.parentElement;
        }
        if (current !== null) {
            let matches = EditorImplementation.editors.filter((e) => e.rootView === current);
            if (matches.length === 0) {
                throw new Error("No editor found for the specified element, although it does have the data-endjin-editor attribute");
            }
            if (matches.length > 1) {
                throw new Error("Multiple editors found for the specified element");
            }

            return matches[0];
        }

        return null;
    }
}