/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/BidirectionalIsloationModel.ts" />

namespace Endjin.Editor.View {
    export class BidirectionalIsolationAdapter extends ViewAdapterBase<HTMLElement, Model.BidirectionalIsolationModel> {

        protected readonly adapterDisplayName: string = "bidirectional isolation adapter";
        protected readonly modelContentType: string = Model.BidirectionalIsolationModel.ContentType;
        protected readonly viewTagName: string = "BDI";

        protected createModelInstance(): Model.BidirectionalIsolationModel {
            return new Model.BidirectionalIsolationModel();
        }
    }
}