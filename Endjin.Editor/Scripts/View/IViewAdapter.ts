/// <reference path="../Model/IModel.ts" />


namespace Endjin.Editor.View {
    /** 
     * Interface implemented by view adapters
     */
    export interface IViewAdapter {

        /**
         * Render a model to an HTMLELement
         * @param model - The model to render
         * @param existingView - The existing view for the model, or null if no view has already been rendered
         * @returns - the HTML representation of the model element and its children
         */
        render(model: Endjin.Editor.Model.IModel, existingView: HTMLElement | null): HTMLElement;

        /**
         * Indicates whether this view adapter can parse the specified HTMLElement
         * @param element - The element to parse
         * @returns - true if the element can be parsed, otherwise false
         */
        canParseView(element: HTMLElement): boolean;

        /**
         * Parse a view element into a model
         * @param element - The HTMLElement to parse
         * @returns - an instance of the model
         * @throws - If the element cannot be parsed
         */
        parseView(element: HTMLElement): Model.IModel;

        /**
         * Determines the priority at which to apply the adapter in the case of a match when parsing an element
         * 
         * The primitive adapters will have priority zero by default, and composite/user defined adapters will usually
         * specify a higher value so that they take precedence for a given element type.
         * */
        readonly priority: number;

        /**
         * Gets or sets the view engine associated with this adapter
         * */
        viewEngine: ViewEngine;
    }

    export function applyGlobalAttributes(model: Model.IModel, view: HTMLElement) {
        view.id = model.id;
        if (model.classList.length > 0) {
            view.classList.add(...model.classList);
        }

        if (model.accessKeys.length > 0) {
            view.accessKey = model.accessKeys.join(" ");
        }

        if (model.textDirection === null) {
            view.removeAttribute("dir");
        } else {
            view.dir = model.textDirection;
        }

        if (model.isHidden === null) {
            view.removeAttribute("hidden");
        } else {
            view.hidden = model.isHidden;
        }
        if (model.tabIndex === null) {
            view.removeAttribute("tabIndex");
        } else {
            view.tabIndex = model.tabIndex;
        }
        if (model.title === null) {
            view.removeAttribute("title");
        } else {
            view.title = model.title;
        }
    }

    export function parseGlobalAttributes(model: Model.IModel, view: HTMLElement) {
        if (view.id) {
            model.id = view.id;
        }

        for (let i = 0; i < view.classList.length; ++i) {
            model.classList.push(view.classList[i]);
        }

        if (view.hasAttribute("accessKey")) {
            let accessKeys = view.accessKey.split(" ");
            model.accessKeys.push(...accessKeys);
        }

        if (view.hasAttribute("dir")) {
            model.textDirection = <Model.TextDirection>view.dir;
        }

        if (view.hasAttribute("hidden")) {
            model.isHidden = view.hidden;
        }

        if (view.hasAttribute("tabIndex")) {
            model.tabIndex = view.tabIndex;
        }

        if (view.hasAttribute("title")) {
            model.title = view.title;
        }
    }
}