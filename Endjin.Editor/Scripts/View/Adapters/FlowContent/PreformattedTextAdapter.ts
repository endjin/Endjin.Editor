/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/FlowContent/PreformattedTextModel.ts" />

namespace Endjin.Editor.View {
    export class PreformattedTextAdapter extends ViewAdapterBase<HTMLPreElement, Model.PreformattedTextModel> {

        protected readonly adapterDisplayName: string = "preformatted text adapter";
        protected readonly modelContentType: string = Model.PreformattedTextModel.ContentType;
        protected readonly viewTagName: string = "PRE";

        protected createModelInstance(): Model.PreformattedTextModel {
            return new Model.PreformattedTextModel();
        }
    }
}