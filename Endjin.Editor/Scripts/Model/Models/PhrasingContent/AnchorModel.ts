/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export enum AnchorTarget {
        Self = "_self",
        Blank = "_blank",
        Parent = "_parent",
        Top = "_top"
    }

    export class AnchorModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.PhrasingContent}.anchor`;

        readonly isInteractive: boolean = true;

        href: string = "";
        rel: Array<string> = [];
        target: AnchorTarget | string = "";

        get contentType(): string {
            return AnchorModel.ContentType;
        }

        readonly acceptsTypes: string[] = [CommonModelTypes.FlowContent];

        canAccept(index: number, child: IModel): boolean {
            if (child.anyInTree((c) => c.contentType === AnchorModel.ContentType)) {
                return false;
            }

            return super.canAccept(index, child);
        }
    }
}