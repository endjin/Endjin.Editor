/// <reference path="../TextDirection.ts" />

namespace Endjin.Editor.Model {
    export abstract class ContentModelBase implements IModel {
        abstract childCount: number;
        abstract forEachChild(func: (child: IModel) => void): void;
        abstract anyInTree(func: (child: IModel) => boolean): boolean;
        abstract getIndex(child: IModel): number;
        abstract getDirectChildIndex(child: IModel): number;
        abstract getChildAtIndex(index: number): IModel;
        abstract acceptChild(index: number, child: IModel): Selection | null;
        abstract canRemoveChildAtIndex(index: number): boolean;
        abstract removeChildAtIndex(index: number): IModel | null;
        abstract canRemoveSelection(selection: Selection): boolean;
        abstract removeSelection(selection: Selection): IModel[];
        abstract canRemoveRange(startIndex: number, endIndex: number): boolean;
        abstract removeRange(startIndex: number, endIndex: number): IModel[];
        abstract canAccept(index: number, child: IModel): boolean;
        abstract canBeAccepted(index: number, parent: IModel): boolean;

        private static NextId: number = 0;

        id: string = (ContentModelBase.NextId++).toString(10);

        abstract readonly contentType: string;

        abstract readonly acceptsTypes: string[];

        parent: IModel | null = null;

        isInteractive: boolean = false;

        isEditable: boolean = true;

        classList: Array<string> = [];
        accessKeys: Array<string> = [];
        textDirection: TextDirection | null = null;
        isHidden: boolean | null = null;
        tabIndex: number | null = null;
        title: string | null = null;


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
    }
}