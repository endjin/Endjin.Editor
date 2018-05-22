/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/SampleModel.ts" />

namespace Endjin.Editor.View {
    export class SampleAdapter extends ViewAdapterBase<HTMLElement, Model.SampleModel> {

        protected readonly adapterDisplayName: string = "sample adapter";
        protected readonly modelContentType: string = Model.SampleModel.ContentType;
        protected readonly viewTagName: string = "SAMP";

        protected createModelInstance(): Model.SampleModel {
            return new Model.SampleModel();
        }
    }
}