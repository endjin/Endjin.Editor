/// <reference path="../Model/Document.ts" />
/// <reference path="ViewEngine.ts" />
/// <reference path="Handlers/TypingHandler.ts" />
/// <reference path="Handlers/ClipboardHandler.ts" />

namespace Endjin.Editor.View {
    /**
     * Register default view event handlers
     * @param viewEngine - the view engine
     * @param document - the document
     */
    export function registerDefaultHandlers(viewEngine: ViewEngine, document: Model.Document): void {
        viewEngine.addViewEventHandler(new View.TypingHandler(), document.root);
        viewEngine.addViewEventHandler(new View.ClipboardHandler(), document.root);
    }
}