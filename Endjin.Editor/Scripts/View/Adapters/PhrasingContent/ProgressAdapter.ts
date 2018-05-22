/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/ProgressModel.ts" />

namespace Endjin.Editor.View {
    export class ProgressAdapter extends ViewAdapterBase<HTMLProgressElement, Model.ProgressModel> {

        protected readonly adapterDisplayName: string = "progress adapter";
        protected readonly modelContentType: string = Model.ProgressModel.ContentType;
        protected readonly viewTagName: string = "PROGRESS";

        protected createModelInstance(): Model.ProgressModel {
            return new Model.ProgressModel();
        }
        protected applyCustomAttributes(model: Model.ProgressModel, view: HTMLProgressElement): void {
            view.max = model.maximum;
            view.value = model.value;
        }

        protected parseCustomAttributes(model: Model.ProgressModel, view: HTMLProgressElement): void {
            model.maximum = view.max;
            model.value = view.value;
        }
    }
}