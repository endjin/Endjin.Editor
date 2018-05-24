/// <reference path="../IModel.ts" />
/// <reference path="../Document.ts" />
/// <reference path="../Selection.ts" />
/// <reference path="IDocumentCommand.ts" />
/// <reference path="CommandBatch.ts" />

namespace Endjin.Editor.Model {
    /** Executes a backspace operation */
    export class BackspaceCommand implements IDocumentCommand {
        readonly commandType: string = "application/vnd.endjin.editor.documentcommand.backspace";

        constructor(private editor: IEditor, private selection: Selection | null) { }

        canExecute(): boolean {
            if (this.selection === null) {
                return false;
            }

            // Is the selection scope OK with removing this selection?
            if (!this.selection.selectionScope.canRemoveSelection(this.selection)) {
                return false;
            }

            let backspaceSelection = moveSelectionToPreviousCharacter(this.selection.normalize().collapseToStart());
            return backspaceSelection.selectionScope.canRemoveSelection(backspaceSelection);
        }

        execute(): IModel[] {
            if (!this.canExecute()) {
                return [];
            }

            if (this.selection === null) {
                return [];
            }

            let deletedModels: Array<IModel> = this.selection.selectionScope.removeSelection(this.selection);
            // We are actually done with these models, so tell the editor that.
            this.editor.destroyModels(...deletedModels);

            let normalizedSelection = this.selection.normalize();

            let backspaceSelection = moveSelectionToPreviousCharacter(this.selection.normalize().collapseToStart());

            deletedModels = backspaceSelection.selectionScope.removeSelection(backspaceSelection);

            // We are actually done with these models, so tell the editor that.
            this.editor.destroyModels(...deletedModels);

            let deleteTextModel = <TextModel>backspaceSelection.selectionScope;
            let currentParent = deleteTextModel.parent;
            if (deleteTextModel.textRun.length === 0) {
                removeChildFromParent(deleteTextModel);
                while (currentParent !== null && currentParent.parent !== null && currentParent.childCount === 0) {
                    let previousParent = currentParent;
                    currentParent = previousParent.parent;
                    removeChildFromParent(previousParent);
                    this.editor.destroyModels(previousParent);
                }
                backspaceSelection = moveSelectionToPreviousCharacter(backspaceSelection);
            }


            this.editor.selection = backspaceSelection.collapseToStart();

            return [this.selection.selectionScope, backspaceSelection.selectionScope, <IModel>currentParent];
        }

        undo(): IModel[] {
            return [];
        }
    }
}