/// <reference path="../IModel.ts" />
/// <reference path="../Document.ts" />
/// <reference path="../Selection.ts" />
/// <reference path="IDocumentCommand.ts" />

namespace Endjin.Editor.Model {
    /** A batch of commands for execution */
    export class CommandBatch {
        private static isExecutingBatch: boolean = false;

        constructor(private commands: Array<IDocumentCommand>) {}

        /**
         * Execute the batch
         * @param document - the document against which to execute the command
         */
        execute(): Array<IModel> {
            let modelsToRender: Array<IModel> = [];
            let isNestedBatch = CommandBatch.isExecutingBatch;
            CommandBatch.isExecutingBatch = true;
            try {
                modelsToRender.length = 0;
                this.commands.forEach((c) => modelsToRender.push(...c.execute()));
            } catch (e) {
                modelsToRender = this.pruneModels(modelsToRender);
                if (isNestedBatch) {
                    // rethrow if we are a nested batch
                    throw e;
                }
                else {
                    // if we are not a nested batch, we can undo the changes.
                    this.undo();
                }
            } finally {
                if (!isNestedBatch) {
                    CommandBatch.isExecutingBatch = false;
                }
            }

            // Then prune to the subset that we are going to cache for undo
            modelsToRender = this.pruneModels(modelsToRender);
            return modelsToRender;
        }

        /**
         * Undo the batch
         * */
        undo(): Array<IModel> {
            let modelsToRender: Array<IModel> = [];
            let isNestedBatch = CommandBatch.isExecutingBatch;
            CommandBatch.isExecutingBatch = true;
            try {
                let reversedCommands = this.commands.reverse();
                reversedCommands.forEach((c) => modelsToRender.push(...c.undo()));
            } catch (e) {
                modelsToRender = this.pruneModels(modelsToRender);
                if (isNestedBatch) {
                    // rethrow if we are a nested batch
                    throw e;
                }
                else {
                    // if we are not a nested batch, we can attempt to redo the changes.
                    this.execute();
                }
            } finally {
                if (!isNestedBatch) {
                    CommandBatch.isExecutingBatch = false;
                }
            }

            // Then prune to the subset that we are going to cache for undo
            modelsToRender = this.pruneModels(modelsToRender);
            return modelsToRender;
        }

        /**
         * Take this list of affected models and turn it into a minimal list of root tree fragments
         * for re-rendering
         * 
         * This is O(M log(N)) where M is the number of candidates and N is the size of the tree.
         * */
        private pruneModels(modelsToRender: Array<IModel>): Array<IModel> {
            let prunedModels: Array<IModel> = [];

            // Candidate set is expected to be small
            let candidateIdMap: Map<string, IModel> = new Map<string, IModel>();
            // Build candidate map
            modelsToRender.forEach((m) => {
                candidateIdMap.set(m.id, m);
            });

            modelsToRender.forEach((m) => {
                if (!m.anyParent(p => candidateIdMap.has(p.id), false)) {
                    // There's no parent in the candidate tree, so push the item
                    prunedModels.push(m);
                }
            });

            return prunedModels;
        }
    }
}