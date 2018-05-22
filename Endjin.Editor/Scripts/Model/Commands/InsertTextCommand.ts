/// <reference path="../IModel.ts" />
/// <reference path="../Document.ts" />
/// <reference path="../Selection.ts" />
/// <reference path="IDocumentCommand.ts" />
/// <reference path="CommandBatch.ts" />

namespace Endjin.Editor.Model {
    /** Execute a text insertion command */
    export class InsertTextCommand implements IDocumentCommand {
        readonly commandType: string = "application/vnd.endjin.editor.documentcommand.inserttext";
        private originalTextRun: string = "";

        constructor(private editor: IEditor, private selection: Selection | null, private textRun: string) { }

        canExecute(): boolean {
            if (this.selection === null) {
                return false;
            }

            return true;
        }

        execute(): IModel[] {
            if (this.selection === null) {
                // No selection, no operation
                return [];
            }

            let insertedSelection: Selection | null = null;
            let affectedModels: Array<IModel> = [];
            if (this.selection.isCollapsed) {
                // We are in a simple insertion/replace within a single model, so there is no
                // complex coalescing to be done
                insertedSelection = this.selection.selectionEnd.model.acceptChild(this.selection.selectionEnd.index, new TextModel(this.textRun));
                if (insertedSelection !== null) {
                    affectedModels.push(insertedSelection.selectionScope);
                }
            }
            else {
                this.selection.selectionScope.removeSelection(this.selection);
                insertedSelection = this.selection.selectionStart.model.acceptChild(this.selection.selectionStart.index, new TextModel(this.textRun));
                affectedModels.push(this.selection.selectionScope);
            }

            if (insertedSelection !== null) {
                this.editor.selection = new Selection(insertedSelection.selectionScope, insertedSelection.selectionEnd, insertedSelection.selectionEnd);
            } 
            return affectedModels;

        }

        undo(): IModel[] {
            throw new Error("Not implemented.");
        }
    }
}