/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/StrongModel.ts" />

namespace Endjin.Editor.View {
    export class StrongAdapter extends ViewAdapterBase<HTMLElement, Model.StrongModel> {

        protected readonly adapterDisplayName: string = "strong adapter";
        protected readonly modelContentType: string = Model.StrongModel.ContentType;
        protected readonly viewTagName: string = "STRONG";

        protected createModelInstance(): Model.StrongModel {
            return new Model.StrongModel();
        }
    }
}