/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/SpanModel.ts" />

namespace Endjin.Editor.View {
    export class SpanAdapter extends ViewAdapterBase<HTMLSpanElement, Model.SpanModel> {

        protected readonly adapterDisplayName: string = "span adapter";
        protected readonly modelContentType: string = Model.SpanModel.ContentType;
        protected readonly viewTagName: string = "SPAN";

        protected createModelInstance(): Model.SpanModel {
            return new Model.SpanModel();
        }
    }
}