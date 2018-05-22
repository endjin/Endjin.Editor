/// <reference path="../ViewEngine.ts" />
/// <reference path="IViewEventHandler.ts" />
/// <reference path="../../Model/IModel.ts" />

namespace Endjin.Editor.View {
    export class ClipboardHandler implements IViewEventHandler {
        private cutSubscription: Rx.IDisposable | null = null;
        private copySubscription: Rx.IDisposable | null = null;
        private pasteSubscription: Rx.IDisposable | null = null;

        private executingOperation = false;

        editor: IEditor;

        attachToView(view: HTMLElement): void {
            this.cutSubscription = Rx.Observable.fromEvent(view, "cut").subscribe((e: ClipboardEvent) => {
                if (this.executingOperation) {
                    return;
                }
                e.preventDefault();
                e.stopPropagation();
                this.executingOperation = true;
                // We copy the highlighted content to the clipboard
                document.execCommand("copy");
                window.setTimeout(() => {
                    // TODO: execute the cut command
                    this.executingOperation = false;
                }, 20);
            });
            this.copySubscription = Rx.Observable.fromEvent(view, "copy").subscribe((e: ClipboardEvent) => {
                if (this.executingOperation) {
                    return;
                }
                e.preventDefault();
                e.stopPropagation();
                this.executingOperation = true;
                // We copy the highlighted content to the clipboard
                document.execCommand("copy");
                window.setTimeout(() => {
                    this.executingOperation = false;
                }, 20);
            });
            this.pasteSubscription = Rx.Observable.fromEvent(view, "paste").subscribe((e: ClipboardEvent) => {
                e.preventDefault();
                e.stopPropagation();

                // TODO: execute the paste command

            });
        }

        destroy(): void {
            if (this.cutSubscription !== null) {
                this.cutSubscription.dispose();
            }
        }
    }
}