/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />
/// <reference path="../UnclassifiedContent/FigureCaptionModel.ts" />

namespace Endjin.Editor.Model {
    export class FigureModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.FlowContent}.figure`;

        get contentType(): string {
            return FigureModel.ContentType;
        }

        readonly acceptsTypes: string[] = [CommonModelTypes.FlowContent, FigureCaptionModel.ContentType];

        canAccept(index: number, child: IModel): boolean {
            if (child.contentType === FigureCaptionModel.ContentType) {
                if (this.children.length === 0) {
                    return true;
                }

                if (index > 0 || index < this.children.length) {
                    return false;
                }

                if (this.children.length > 0 && this.children[0].contentType === FigureCaptionModel.ContentType || this.children[this.children.length - 1].contentType === FigureCaptionModel.ContentType) {
                    return false;
                }
            }

            return super.canAccept(index, child);
        }
    }
}