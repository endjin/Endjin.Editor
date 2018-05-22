/// <reference path="../IModel.ts" />
/// <reference path="../Document.ts" />
/// <reference path="../Selection.ts" />
/// <reference path="IDocumentCommand.ts" />
/// <reference path="CommandBatch.ts" />

namespace Endjin.Editor.Model {
    /** Executes a delete operation */
    export class DeleteCommand implements IDocumentCommand {
        readonly commandType: string = "application/vnd.endjin.editor.documentcommand.delete";

        constructor(private editor: IEditor, private selection: Selection | null) { }

        canExecute(): boolean {
            return false;
        }

        execute(): IModel[] {
            return [];
        }

        undo(): IModel[] {
            return [];
        }
    }
}