/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />
/// <reference path="../FlowContent/FigureModel.ts" />

namespace Endjin.Editor.Model {
    export class FigureCaptionModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.UnclassifiedContent}.figurecaption`;

        get contentType(): string {
            return FigureCaptionModel.ContentType;
        }

        readonly acceptsTypes: string[] = [CommonModelTypes.FlowContent];

        canBeAccepted(index: number, parent: IModel): boolean {
            return parent.contentType === FigureModel.ContentType;
        }
    }
}