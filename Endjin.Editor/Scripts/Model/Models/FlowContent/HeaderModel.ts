/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />
/// <reference path="FooterModel.ts" />

namespace Endjin.Editor.Model {
    export class HeaderModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.FlowContent}.header`;

        get contentType(): string {
            return HeaderModel.ContentType;
        }

        readonly acceptsTypes: string[] = [CommonModelTypes.FlowContent];

        canAccept(index: number, child: IModel): boolean {
            if (child.anyInTree((c) => c.contentType === HeaderModel.ContentType || c.contentType === FooterModel.ContentType)) {
                return false;
            }

            return super.canAccept(index, child);
        }
    }
}