/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/FlowContent/HeaderModel.ts" />

namespace Endjin.Editor.View {
    export class HeaderAdapter extends ViewAdapterBase<HTMLElement, Model.HeaderModel> {

        protected readonly adapterDisplayName: string = "header adapter";
        protected readonly modelContentType: string = Model.HeaderModel.ContentType;
        protected readonly viewTagName: string = "HEADER";

        protected createModelInstance(): Model.HeaderModel {
            return new Model.HeaderModel();
        }
    }
}