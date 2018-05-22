/// <reference path="IModel.ts" />

namespace Endjin.Editor.Model {
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