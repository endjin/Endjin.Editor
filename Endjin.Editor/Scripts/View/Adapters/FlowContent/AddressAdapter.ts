/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/FlowContent/AddressModel.ts" />

namespace Endjin.Editor.View {
    export class AddressAdapter extends ViewAdapterBase<HTMLElement, Model.AddressModel> {

        protected readonly adapterDisplayName: string = "address adapter";
        protected readonly modelContentType: string = Model.AddressModel.ContentType;
        protected readonly viewTagName: string = "ADDRESS";

        protected createModelInstance(): Model.AddressModel {
            return new Model.AddressModel();
        }
    }
}