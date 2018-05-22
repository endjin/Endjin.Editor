/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/FlowContent/MainModel.ts" />

namespace Endjin.Editor.View {
    export class MainAdapter extends ViewAdapterBase<HTMLElement, Model.MainModel> {

        protected readonly adapterDisplayName: string = "main adapter";
        protected readonly modelContentType: string = Model.MainModel.ContentType;
        protected readonly viewTagName: string = "MAIN";

        protected createModelInstance(): Model.MainModel {
            return new Model.MainModel();
        }
    }
}