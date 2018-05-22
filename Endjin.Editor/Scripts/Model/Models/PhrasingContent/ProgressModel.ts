/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class ProgressModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.PhrasingContent}.progress`;

        get contentType(): string {
            return ProgressModel.ContentType;
        }

        maximum: number;
        value: number;

        readonly acceptsTypes: string[] = [CommonModelTypes.PhrasingContent];

        canAccept(index: number, child: IModel): boolean {
            if (child.anyInTree((c) => c.contentType === ProgressModel.ContentType)) {
                return false;
            }

            return super.canAccept(index, child);
        }
    }
}