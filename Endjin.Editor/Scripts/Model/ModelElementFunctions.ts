/// <reference path="IModel.ts" />

namespace Endjin.Editor.Model {

    export function moveSelectionToPreviousCharacter(selection: Selection): Selection {
        if (selection.selectionStart.index > 0) {
            return new Selection(selection.selectionScope, new Location(selection.selectionStart.model, selection.selectionStart.index - 1), selection.selectionEnd);
        }

        let current: IModel | null = getPreviousModel(selection.selectionStart.model);
        while (current !== null && current.contentType !== TextModel.ContentType) {
            current = getPreviousModel(current);
        }

        if (current !== null) {
            let textModel = <TextModel>current;
            return new Selection(textModel, new Location(textModel, textModel.textRun.length - 1), new Location(textModel, textModel.textRun.length));
        }

        return selection;        
    }

    export function moveSelectionToNextCharacter(selection: Selection): Selection {
        if (selection.selectionEnd.model.contentType !== TextModel.ContentType) {
            return selection;
        }

        let endTextModel = <TextModel>selection.selectionEnd.model;

        if (selection.selectionEnd.index < endTextModel.textRun.length) {
            return new Selection(endTextModel, new Location(endTextModel, selection.selectionEnd.index), new Location(endTextModel, selection.selectionEnd.index + 1));
        }

        let current: IModel | null = getNextModel(endTextModel);
        while (current !== null && current.contentType !== TextModel.ContentType) {
            current = getNextModel(current);
        }

        if (current !== null) {
            return new Selection(current, new Location(current, 0), new Location(current, 1),);
        }

        return selection;
    }

    export function normalizeTextNodes(model: IModel): void {
        let index = 0;
        let currentTextNode: TextModel | null = null;
        while (index < model.childCount) {
            let child = model.getChildAtIndex(index);
            if (child.contentType === TextModel.ContentType) {
                if (currentTextNode === null) {
                    currentTextNode = <TextModel>child;
                    index++;
                } else {
                    currentTextNode.acceptChild(currentTextNode.textRun.length, child);
                    model.removeChildAtIndex(index);
                }
            } else {
                currentTextNode = null;
                index++;
            }
        }
    }

    export function isModelElementBefore(f: IModel, s: IModel): boolean {
        let first: IModel | null = f;
        let second: IModel | null = s;

        if (first === second) {
            return false;
        }

        let previousFirst: IModel | null = first;
        let previousSecond: IModel | null = second;

        // step up until we find the common ancestor
        while (first !== second) {
            previousFirst = first;
            previousSecond = second;
            if (first !== null) {
                first = first.parent;
            }
            if (second !== null) {
                second = second.parent;
            }
        }


        if (first !== null && previousFirst !== null && previousSecond !== null) {
            let i1 = first.getIndex(previousFirst);
            let i2 = first.getIndex(previousSecond)

            return i1 < i2;
        }

        return false;
    }

    export function getNextModel(model: IModel): IModel | null {
        if (model.childCount > 0) {
            return model.getChildAtIndex(0);
        }

        let currentParent = model.parent;
        let currentChild = model;

        while (currentParent !== null) {
            let index = currentParent.getIndex(currentChild);
            if (index < currentParent.childCount - 1) {
                return currentParent.getChildAtIndex(index + 1);
            }
            currentChild = currentParent;
            currentParent = currentChild.parent;
        }

        return null;
    }

    export function getPreviousModel(model: IModel): IModel | null {
        if (model.parent === null) {
            return null;
        }

        let currentIndex = model.parent.getIndex(model);
        if (currentIndex > 0) {
            return getDeepestRightmostChild(model.parent.getChildAtIndex(currentIndex - 1));
        } else {
            return model.parent;
        }
    }

    export function getDeepestRightmostChild(root: IModel): IModel {
        if (root.childCount === 0) {
            return root;
        }
        return getDeepestRightmostChild(root.getChildAtIndex(root.childCount - 1));
    }

    export function removeChildFromParent(child: IModel): boolean {
        if (child.parent === null) {
            return false;
        }

        let index = child.parent.getIndex(child);
        return child.parent.removeChildAtIndex(index) !== null;
    }

    export function isModelElementAfter(f: IModel, s: IModel): boolean {
        let first: IModel | null = f;
        let second: IModel | null = s;

        if (first === second) {
            return false;
        }

        let previousFirst: IModel | null = first;
        let previousSecond: IModel | null = second;

        // then step up until we find the common ancestor
        while (first !== second) {
            previousFirst = first;
            previousSecond = second;
            if (first !== null) {
                first = first.parent;
            }
            if (second !== null) {
                second = second.parent;
            }
        }

        if (first !== null && previousFirst !== null && previousSecond !== null) {
            let i1 = first.getIndex(previousFirst);
            let i2 = first.getIndex(previousSecond)

            return i1 > i2;
        }

        return false;
    }

    /**
     * Get the common ancestor of two model elements
     * @param first - the first element
     * @param second -the second element
     */
    export function getCommonAncestor(f: IModel, s: IModel): IModel | null {
        let first: IModel | null = f;
        let second: IModel | null = s;

        if (first === second) {
            return first;
        }

        let d1 = 0;
        let d2 = 0;

        // Find the distances from the root
        for (let t: IModel | null = first; !!t; t = t.parent, d1++) { }
        for (let t: IModel | null = second; !!t; t = t.parent, d2++) { }

        // Normalize the distances
        if (d1 > d2) {
            let temp1 = d1;
            d1 = d2;
            d2 = temp1;

            let temp2 = first;
            first = second;
            second = temp2;
        }

        // Bring the second up to the same level in the tree as the first
        for (let i = 0; i < (d2 - d1); ++i) {
            if (second !== null) {
                second = second.parent;
            }
        }

        // then step up until we find the common ancestor
        while (first !== second) {
            if (first !== null) {
                first = first.parent;
            }
            if (second !== null) {
                second = second.parent;
            }
        }

        return first;
    }
}