/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/FlowContent/FigureModel.ts" />

namespace Endjin.Editor.View {
    export class FigureAdapter extends ViewAdapterBase<HTMLElement, Model.FigureModel> {

        protected readonly adapterDisplayName: string = "figure adapter";
        protected readonly modelContentType: string = Model.FigureModel.ContentType;
        protected readonly viewTagName: string = "FIGURE";

        protected createModelInstance(): Model.FigureModel {
            return new Model.FigureModel();
        }
    }
}