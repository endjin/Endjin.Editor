/// <reference path="ContentModelBase.ts" />
/// <reference path="../IModel.ts" />

namespace Endjin.Editor.Model {
    export abstract class ChildContentModelBase extends ContentModelBase {
        protected children: Array<IModel> = [];

        // isDirty: boolean = false;

        //get hasDirtyChildren(): boolean {
        //    return this.children.some((c) => c.isDirty);
        //}

        get childCount(): number {
            return this.children.length;
        }

        forEachChild(func: (child: IModel) => void): void {
            this.children.forEach((child) => func(child));
        }

        anyInTree(func: (child: IModel) => boolean): boolean {
            return func(this) || this.children.some((v) => func(v));
        }

        getIndex(child: IModel): number {
            return this.children.indexOf(child);
        }

        getChildAtIndex(index: number): IModel {
            if (index < 0 || index > this.children.length - 1) {
                throw new Error("Index out of range");
            }
            return this.children[index];
        }

        getDirectChildIndex(model: IModel): number {
            let currentCandidate: IModel | null = model;
            let index = this.children.indexOf(currentCandidate);

            while (currentCandidate !== null && currentCandidate !== this) {
                let index = this.children.indexOf(currentCandidate);
                if (index === -1) {
                    currentCandidate = currentCandidate.parent;
                } else {
                    return index;
                }
            }

            return -1;
        }

        anyParent(func: (child: IModel) => boolean, includeSelf: boolean = true): boolean {
            let result = false;
            let current: IModel | null = includeSelf ? this : this.parent;

            while (current !== null) {
                if (func(current)) {
                    return true;
                }
                current = current.parent;
            }

            return false;
        }

        acceptChild(index: number, child: IModel): Selection | null {
            if (!this.canAccept(index, child)) {
                return null;
            }

            if (index == this.children.length) {
                this.children.push(child);
            }
            else {
                this.children.splice(index, 0, child);
            }

            child.parent = this;

            return new Selection(this, new Location(this, index), new Location(this, index + 1));
        }

        canRemoveChildAtIndex(index: number): boolean {
            return this.canRemoveRange(index, index);
        }

        canRemoveRange(startIndex: number, endIndex: number): boolean {
            if (startIndex < 0 || startIndex > this.children.length - 1 ||
                endIndex < 0 || endIndex > this.children.length - 1 ||
                startIndex > endIndex) {
                return false;
            }

            return true;
        }

        removeRange(startIndex: number, endIndex: number): Array<IModel> {
            if (!this.canRemoveRange(startIndex, endIndex)) {
                return [];
            }
            return this.children.splice(startIndex, (endIndex - startIndex) + 1);
        }

        removeChildAtIndex(index: number): IModel | null {
            let removed = this.removeRange(index, index);

            if (removed.length === 0) {
                return null;
            }

            return removed[0];
        }

        canRemoveSelection(selection: Selection): boolean {
            if (selection.selectionScope !== this) {
                return false;
            }

            if (selection.isCollapsed) {
                return true;
            }

            // We can only do this if we have text nodes at the start and end of the range
            if (selection.selectionStart.model.contentType !== TextModel.ContentType ||
                selection.selectionEnd.model.contentType !== TextModel.ContentType) {
                return false;
            }

            let normalizedSelection = selection.normalize();

            let startTextModel = <TextModel>normalizedSelection.selectionStart.model;
            let endTextModel = <TextModel>normalizedSelection.selectionEnd.model;
            let startIndex = normalizedSelection.selectionStart.index;
            let endIndex = normalizedSelection.selectionEnd.index;

            if (startTextModel === endTextModel) {
                return startTextModel.canRemoveRange(startIndex, endIndex);
            }

            // Can we delete the range in the start model
            if (!startTextModel.canRemoveRange(startIndex, startTextModel.textRun.length - 1)) {
                return false;
            }

            // Can we delete the range in the end model
            if (!endTextModel.canRemoveRange(0, endIndex)) {
                return false;
            }

            return true;
        }

        removeSelection(selection: Selection): Array<IModel> {
            let removedModels: Array<IModel> = [];

            if (!this.canRemoveSelection(selection)) {
                return removedModels;
            }

            let normalizedSelection = selection.normalize();

            let startTextModel = <TextModel>normalizedSelection.selectionStart.model;
            let endTextModel = <TextModel>normalizedSelection.selectionEnd.model;
            let startIndex = normalizedSelection.selectionStart.index;
            let endIndex = normalizedSelection.selectionEnd.index;

            // These parents must be non-null
            let startTextModelParent = <IModel>startTextModel.parent;
            let endTextModelParent = <IModel>endTextModel.parent;

            if (startTextModel === endTextModel) {
                startTextModel.removeRange(startIndex, endIndex);
            } else {
                // Delete the range in the start model
                removedModels.push(...startTextModel.removeRange(startIndex, startTextModel.textRun.length - 1));
                // Delete the range in the end model, however, we don't need to dispose of tis
                endTextModel.removeRange(0, endIndex - 1);
                // Coalesce the bit we want from the end with the start text
                startTextModel.acceptChild(startTextModel.textRun.length, endTextModel);
            }

            // Now walk up the tree to the common ancestor, removing the nodes as we go
            let currentModel: IModel | null = endTextModel;

            while (currentModel !== null && currentModel !== this && currentModel.parent !== null && currentModel !== startTextModel) {
                let previousModelInTree = getPreviousModel(currentModel);
                if (currentModel.childCount === 0) {
                    removedModels.push(currentModel);
                    removeChildFromParent(currentModel);
                }
                currentModel = previousModelInTree;
            }

            if (startTextModelParent !== endTextModelParent) {
                // Coalesce the phrasing content from the parent into it too
                let currentCandidate: IModel | null = endTextModelParent;
                while (currentCandidate !== null && currentCandidate.contentType.lastIndexOf(CommonModelTypes.PhrasingContent, 0) > -1) {
                    currentCandidate = currentCandidate.parent;
                }

                if (currentCandidate !== null && currentCandidate !== startTextModelParent) {
                    let removedItems = currentCandidate.removeRange(0, currentCandidate.childCount - 1);
                    let insertionIndex = startTextModelParent.getIndex(startTextModel) + 1;
                    for (let i = 0; i < removedItems.length; ++i) {
                        if (startTextModelParent.acceptChild(insertionIndex++, removedItems[i]) === null) {
                            // if we couldn't add it, we need to add it to the list of removed items to be destroyed
                            removedModels.push(removedItems[i]);
                        }
                    }
                    // get rid of adjacent Text node
                    normalizeTextNodes(startTextModelParent);
                    // Now, remove the "now empty" element
                    // The parent must be a model, cannot be null
                    removedModels.push(currentCandidate);
                    removeChildFromParent(currentCandidate);
                }
            }

            return removedModels;
        }

        canAccept(index: number, child: IModel): boolean {
            if (index < 0 || index > this.children.length) {
                return false;
            }

            return this.acceptsTypes.some((v) => {
                return child.contentType.lastIndexOf(v, 0) === 0;
            });
        }

        canBeAccepted(index: number, parent: IModel): boolean {
            return true;
        }
    }
}