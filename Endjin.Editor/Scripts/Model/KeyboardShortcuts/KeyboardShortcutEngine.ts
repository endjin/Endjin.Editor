/// <reference path="../IDocumentCommand.ts" />
/// <reference path="../Selection.ts" />


namespace Endjin.Editor.Model {
    enum KeyState { AwaitingFirst, AwaitingSecond };

    type KeyCommandBinding = { keychord: Keychord, command: IDocumentCommand };

    /**
     * Handles keyboard shortcut dispatch
     */
    export class KeyboardShortcutEngine {
        private bindings: Array<KeyCommandBinding> = [];
        private keyState: KeyState = KeyState.AwaitingFirst;
        private candidateBindings: Array<KeyCommandBinding> = [];

        constructor(private editor: IEditor) { }

        /**
         * Register a keychord
         * @param keychord - the keychord
         * @param command - the command to execute
         */
        registerKeychord(keychord: Keychord, command: IDocumentCommand) {
            this.bindings = this.bindings.filter((k) => !keychord.equals(k.keychord));
            this.bindings.push({ keychord: keychord, command: command });
        }

        /**
         * Register a key press
         * @param keypress - the key press
         * @param command - the command to execute
         */
        registerKeypress(keypress: Keypress, command: IDocumentCommand) {
            let keychord = new Keychord(keypress, null);
            this.bindings = this.bindings.filter((k) => !keychord.equals(k.keychord));
            this.bindings.push({ keychord: keychord, command: command });
        }

        /**
         * Dispatch a keyboard shortcut
         * @param keypress - the keypress
         * @param selection - the current selection
         */
        dispatchKeyboardShortcut(keypress: Keypress): boolean {
            let result: boolean = false;
            if (this.keyState === KeyState.AwaitingFirst) {
                for (let i = 0; i < this.bindings.length; ++i) {
                    let binding = this.bindings[i];
                    if (binding.keychord.first.equals(keypress)) {
                        // We've matched the first keypress so we are always going to
                        // say we've handled it
                        result = true;

                        if (binding.keychord.second === null) {
                            // there is no second key in the chord, so just try to execute the command
                            this.editor.executeCommand(binding.command);
                            // Now, we may have seen a chord-based item before this one, so we just
                            // clear the state and the candidate list before we bail out
                            this.keyState = KeyState.AwaitingFirst;
                            this.candidateBindings.length = 0;
                            break;
                        } else {
                            // there is a second key in the chord, so add this to the list of candidate
                            // matches and move us into the awaiting second state, but carry on to see if we find more candidates
                            this.keyState = KeyState.AwaitingSecond;
                            this.candidateBindings.push(binding);
                        }
                    }
                }
            } else {
                // we are awaiting the second key in the chord
                for (let i = 0; i < this.candidateBindings.length; ++i) {
                    let binding = this.candidateBindings[i];
                    if (binding.keychord.second !== null && binding.keychord.second.equals(keypress)) {
                        // we've found a match in our candidates, so we need look no further
                        this.editor.executeCommand(binding.command);
                        break;
                    }
                }
                // Whether we found it or not, we reset back to the initial state
                this.keyState = KeyState.AwaitingFirst;
                this.candidateBindings.length = 0;
                return true;
            }

            return false;
        }
    }
}