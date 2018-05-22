/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/FlowContent/DivisionModel.ts" />

namespace Endjin.Editor.View {
    export class DivisionAdapter extends ViewAdapterBase<HTMLDivElement, Model.DivisionModel> {

        protected readonly adapterDisplayName: string = "division adapter";
        protected readonly modelContentType: string = Model.DivisionModel.ContentType;
        protected readonly viewTagName: string = "DIV";

        protected createModelInstance(): Model.DivisionModel {
            return new Model.DivisionModel();
        }
    }
}