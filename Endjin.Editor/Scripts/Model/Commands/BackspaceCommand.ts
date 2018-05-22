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