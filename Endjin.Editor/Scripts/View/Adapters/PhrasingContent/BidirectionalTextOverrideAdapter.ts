/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/BidirectionalTextOverrideModel.ts" />

namespace Endjin.Editor.View {
    export class BidirectionalTextOverrideAdapter extends ViewAdapterBase<HTMLElement, Model.BidirectionalTextOverrideModel> {

        protected readonly adapterDisplayName: string = "bidirectional text override adapter";
        protected readonly modelContentType: string = Model.BidirectionalTextOverrideModel.ContentType;
        protected readonly viewTagName: string = "BDI";

        protected createModelInstance(): Model.BidirectionalTextOverrideModel {
            return new Model.BidirectionalTextOverrideModel();
        }
    }
}