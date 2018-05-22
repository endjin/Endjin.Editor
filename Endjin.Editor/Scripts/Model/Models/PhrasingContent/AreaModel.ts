/// <reference path="../EmptyContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export enum AreaShape {
        Default = "default",
        Rectangle = "rect",
        Circle = "circle",
        Polygon = "poly"
    }

    export enum AreaTarget {
        Self = "_self",
        Blank = "_blank",
        Parent = "_parent",
        Top = "_top"
    }

    export class AreaModel extends EmptyContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.PhrasingContent}.area`;

        alternateText: string = "";
        href: string = "";
        shape: AreaShape = AreaShape.Default;
        rel: Array<string> = [];
        target: AreaTarget | string = ""; 

        get contentType(): string {
            return AreaModel.ContentType;
        }

        canBeAccepted(index: number, parent: IModel): boolean {
            // you can only accept an area model if somewhere in the parentage is a map model
            return parent.anyParent((p) => p.contentType === MapModel.ContentType);
        }
    }
}