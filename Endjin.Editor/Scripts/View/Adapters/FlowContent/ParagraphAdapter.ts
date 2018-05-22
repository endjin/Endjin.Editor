/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/FlowContent/ParagraphModel.ts" />

namespace Endjin.Editor.View {
    export class ParagraphAdapter extends ViewAdapterBase<HTMLParagraphElement, Model.ParagraphModel> {

        protected readonly adapterDisplayName: string = "paragraph adapter";
        protected readonly modelContentType: string = Model.ParagraphModel.ContentType;
        protected readonly viewTagName: string = "P";

        protected createModelInstance(): Model.ParagraphModel {
            return new Model.ParagraphModel();
        }
    }
}