/// <reference path="ContentModelBase.ts" />
/// <reference path="CommonModelTypes.ts" />
/// <reference path="../IModel.ts" />

namespace Endjin.Editor.Model {
    export abstract class EmptyContentModelBase extends ContentModelBase {
        get acceptsTypes(): string[] { return []; }

        // isDirty: boolean;

        // readonly hasDirtyChildren: boolean = false;

        readonly childCount: number = 0;

        forEachChild(func: (child: IModel) => void): void {
        }

        anyInTree(func: (child: IModel) => boolean): boolean {
            return func(this);
        }

        getIndex(child: IModel): number {
            return -1;
        }

        getDirectChildIndex(child: IModel): number {
            return -1;
        }

        getChildAtIndex(index: number): IModel {
            throw new Error("Index out of range");
        }

        canAccept(index: number, child: IModel): boolean {
            return false;
        }

        acceptChild(index: number, child: IModel): Selection | null {
            return null;
        }

        canRemoveSelection(selection: Selection): boolean {
            return false;
        }

        removeSelection(selection: Selection): IModel[] {
            return [];
        }


        canRemoveChildAtIndex(index: number): boolean {
            return false;
        }

        canRemoveRange(startIndex: number, endIndex: number): boolean {
            return false;
        }

        removeRange(startIndex: number, endIndex: number): Array<IModel> {
            return [];
        }

        removeChildAtIndex(index: number): IModel | null {
            return null;
        }

        canBeAccepted(index: number, parent: IModel): boolean {
            return true;
        }
    }
}