/// <reference path="InputAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/InputRadioModel.ts" />

namespace Endjin.Editor.View {
    export class InputRadioAdapter extends InputAdapterBase<Model.InputRadioModel> {
        protected readonly modelContentType: string = Model.InputRadioModel.ContentType;
        protected readonly adapterDisplayName: string = "input radio";
        protected readonly inputElementType: string = "radio";

        protected createModelInstance(): Model.InputRadioModel {
            return new Model.InputRadioModel();
        }

        protected applyCustomAttributes(model: Model.InputRadioModel, view: HTMLInputElement): void {
            super.applyCustomAttributes(model, view);
            view.checked = model.isChecked;
        }

        protected parseCustomAttributes(model: Model.InputRadioModel, view: HTMLInputElement): void {
            super.parseCustomAttributes(model, view);
            model.isChecked = view.checked;
        }
    }
}