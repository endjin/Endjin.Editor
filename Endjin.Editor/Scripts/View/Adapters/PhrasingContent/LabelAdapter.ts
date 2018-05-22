/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/LabelModel.ts" />

namespace Endjin.Editor.View {
    export class LabelAdapter extends ViewAdapterBase<HTMLLabelElement, Model.LabelModel> {

        protected readonly adapterDisplayName: string = "label adapter";
        protected readonly modelContentType: string = Model.LabelModel.ContentType;
        protected readonly viewTagName: string = "LABEL";

        protected createModelInstance(): Model.LabelModel {
            return new Model.LabelModel();
        }
        protected applyCustomAttributes(model: Model.LabelModel, view: HTMLLabelElement): void {
            view.htmlFor = model.targetModelId;
        }

        protected parseCustomAttributes(model: Model.LabelModel, view: HTMLLabelElement): void {
            model.targetModelId = view.htmlFor;
        }
    }
}