/// <reference path="../../Model/IModel.ts" />

namespace Endjin.Editor.View {
    /**
     * Interface implemented by components that handle events
     * for views.
     * */
    export interface IViewEventHandler {
        /**
         * Attach to a view
         * @param view - the view to which to attach the event
         */
        attachToView(view: HTMLElement): void;

        /**
         * Detach from a view
         * @param view - the view from which to detach
         * @param model - the model associated with the view
         */
        destroy(): void;

        /**
         * Get or set the editor for the handler
         * */
        editor: IEditor;
    }
}