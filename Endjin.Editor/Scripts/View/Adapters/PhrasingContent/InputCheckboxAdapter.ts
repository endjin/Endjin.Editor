/// <reference path="InputAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/InputCheckboxModel.ts" />

namespace Endjin.Editor.View {
    export class InputCheckboxAdapter extends InputAdapterBase<Model.InputCheckboxModel> {
        protected readonly modelContentType: string = Model.InputCheckboxModel.ContentType;
        protected readonly adapterDisplayName: string = "input checkbox";
        protected readonly inputElementType: string = "checkbox";

        protected createModelInstance(): Model.InputCheckboxModel {
            return new Model.InputCheckboxModel();
        }

        protected applyCustomAttributes(model: Model.InputCheckboxModel, view: HTMLInputElement): void {
            super.applyCustomAttributes(model, view);
            view.checked = model.isChecked;
        }

        protected parseCustomAttributes(model: Model.InputCheckboxModel, view: HTMLInputElement): void {
            super.parseCustomAttributes(model, view);
            model.isChecked = view.checked;
        }
    }
}