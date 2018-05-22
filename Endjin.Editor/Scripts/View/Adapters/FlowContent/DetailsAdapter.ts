/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/FlowContent/DetailsModel.ts" />

namespace Endjin.Editor.View {
    export class DetailsAdapter extends ViewAdapterBase<HTMLDetailsElement, Model.DetailsModel> {

        protected readonly adapterDisplayName: string = "details adapter";
        protected readonly modelContentType: string = Model.DetailsModel.ContentType;
        protected readonly viewTagName: string = "DETAILS";

        protected createModelInstance(): Model.DetailsModel {
            return new Model.DetailsModel();
        }
        protected applyCustomAttributes(model: Model.DetailsModel, view: HTMLDetailsElement): void {
            view.open = model.isOpen;
        }

        protected parseCustomAttributes(model: Model.DetailsModel, view: HTMLDetailsElement): void {
            model.isOpen = view.open;
        }
    }
}