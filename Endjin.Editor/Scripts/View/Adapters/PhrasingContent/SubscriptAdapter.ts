/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/SubscriptModel.ts" />

namespace Endjin.Editor.View {
    export class SubscriptAdapter extends ViewAdapterBase<HTMLElement, Model.SubscriptModel> {

        protected readonly adapterDisplayName: string = "subscript adapter";
        protected readonly modelContentType: string = Model.SubscriptModel.ContentType;
        protected readonly viewTagName: string = "SUB";

        protected createModelInstance(): Model.SubscriptModel {
            return new Model.SubscriptModel();
        }
    }
}