/// <reference path="../ViewEngine.ts" />
/// <reference path="IViewEventHandler.ts" />
/// <reference path="../../Model/IModel.ts" />
/// <reference path="../../Model/Commands/BackspaceCommand.ts" />
/// <reference path="../../Model/Commands/NewlineCommand.ts" />
/// <reference path="../../Model/Commands/DeleteCommand.ts" />
/// <reference path="../../Model/Commands/InsertTextCommand.ts" />

namespace Endjin.Editor.View {
    export class TypingHandler implements IViewEventHandler {
        private subscription: Rx.IDisposable | null = null;

        editor: IEditor;

        attachToView(view: HTMLElement): void {
            this.subscription = Rx.Observable.fromEvent(view, "keydown").subscribe((e: KeyboardEvent) => {
                if (this.isSafeKey(e.keyCode, e.altKey, e.shiftKey, e.ctrlKey, e.metaKey)) {
                    // We just pass through if it is a safe key
                    return;
                }

                // Otherwise, we handle the event
                e.preventDefault();
                e.stopPropagation();

                let keypress = new Model.Keypress(e.keyCode, e.shiftKey, e.altKey, e.ctrlKey, e.metaKey);

                // First, try our keyboard shortcuts
                if (this.editor.keyboardShortcuts.dispatchKeyboardShortcut(keypress)) {
                    return;
                }

                if (e.keyCode === 13) {
                    this.editor.executeCommand(new Model.NewlineCommand(this.editor, this.editor.selection));
                    return;
                }

                if (e.keyCode === 8) {
                    this.editor.executeCommand(new Model.BackspaceCommand(this.editor, this.editor.selection));
                }

                if (e.keyCode === 46) {
                    this.editor.executeCommand(new Model.DeleteCommand(this.editor, this.editor.selection));
                }

                if (e.keyCode === 9 || e.keyCode === 27) {
                    // Swallow escape and tabs if we haven't handled them in the keyboard shortcuts
                    return;
                }


                this.editor.executeCommand(new Model.InsertTextCommand(this.editor, this.editor.selection, e.key));
            });
        }

        destroy(): void {
            if (this.subscription !== null) {
                this.subscription.dispose();
            }
        }

        private isSafeKey(keyCode: number, altKey: boolean, shiftKey: boolean, controlKey: boolean, metaKey: boolean): boolean {
            let result = false;
            // These are the arrow keys plus page up/page down, home and end
            result = result || keyCode >= 33 && keyCode <= 40;
            // Ctrl-x, Ctrl-c, Ctrl-v clipboard operations (dealt with by our clipboard handler)
            result = result || controlKey && (keyCode === 67 || keyCode === 86 || keyCode === 88);
            // These are the additional modifiers
            result = result || (keyCode >= 16 && keyCode <= 20) || keyCode === 91 || keyCode === 92 || keyCode === 93;
            // These are the F keys
            result = result || keyCode >= 112 && keyCode <= 123;
            // These are numlock and scroll lock
            result = result || keyCode === 144 || keyCode === 145;
            return result;
        }
    }
}