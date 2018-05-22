/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/UnclassifiedContent/LegendModel.ts" />

namespace Endjin.Editor.View {
    export class LegendAdapter extends ViewAdapterBase<HTMLElement, Model.LegendModel> {

        protected readonly adapterDisplayName: string = "legend adapter";
        protected readonly modelContentType: string = Model.LegendModel.ContentType;
        protected readonly viewTagName: string = "LEGEND";

        protected createModelInstance(): Model.LegendModel {
            return new Model.LegendModel();
        }
    }
}