/// <reference path="../IModel.ts" />
/// <reference path="../Document.ts" />
/// <reference path="../Selection.ts" />
/// <reference path="CommandBatch.ts" />

namespace Endjin.Editor.Model {
    /** Interface implemented by a document command */
    export interface IDocumentCommand {
        /**
         * Get the type of the document command
         */
        readonly commandType: string;

        /**
         * Determine if the command can be executed given the current context
         * @param document - the document
         * @param selection - the current selection
         */
        canExecute(): boolean;

        /**
         * Execute the command against the document
         * @param document - the document against which to execute the command
         * @param selection - the current selection
         * @returns - an array of the models that were affected by the execution of the command
         */
        execute(): Array<IModel>;

        /**
         * Undo the command against the document
         * @param document - the document against which to execute the command
         * @param selection - the selection
         * @returns - an array of the models that were affected by undoing the command
         */
        undo(): Array<IModel>;
    }
}