/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/UnclassifiedContent/FigureCaptionModel.ts" />

namespace Endjin.Editor.View {
    export class FigureCaptionAdapter extends ViewAdapterBase<HTMLElement, Model.FigureCaptionModel> {

        protected readonly adapterDisplayName: string = "figure caption adapter";
        protected readonly modelContentType: string = Model.FigureCaptionModel.ContentType;
        protected readonly viewTagName: string = "FIGCAPTION";

        protected createModelInstance(): Model.FigureCaptionModel {
            return new Model.FigureCaptionModel();
        }
    }
}