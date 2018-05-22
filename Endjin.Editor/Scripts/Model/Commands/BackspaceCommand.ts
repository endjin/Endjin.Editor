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

            // TODO: validate we can execute the backspace

            return true;
        }

        execute(): IModel[] {
            if (!this.canExecute()) {
                return [];
            }

            if (this.selection === null) {
                return [];
            }

            let normalizedSelection = this.selection.normalize();

            let deletedModels: Array<IModel> = this.selection.selectionScope.removeSelection(this.selection);
            // We are actually done with these models, so tell the editor that.
            this.editor.destroyModels(...deletedModels);

            let collapsedSelection = normalizedSelection.collapseToStart();

            this.editor.selection = collapsedSelection;
            
            return [this.selection.selectionScope];
        }

        undo(): IModel[] {
            return [];
        }
    }
}