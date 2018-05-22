/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/UnclassifiedContent/OptionModel.ts" />

namespace Endjin.Editor.View {
    export class OptionAdapter extends ViewAdapterBase<HTMLOptionElement, Model.OptionModel> {

        protected readonly adapterDisplayName: string = "option adapter";
        protected readonly modelContentType: string = Model.OptionModel.ContentType;
        protected readonly viewTagName: string = "OPTION";

        protected createModelInstance(): Model.OptionModel {
            return new Model.OptionModel();
        }

        protected applyCustomAttributes(model: Model.OptionModel, view: HTMLOptionElement): void {
            if (model.isDisabled === null) {
                view.removeAttribute("disabled");
            } else {
                view.disabled = model.isDisabled;
            }
            if (model.label === null) {
                view.removeAttribute("label");
            } else {
                view.label = model.label;
            }
            if (model.value === null) {
                view.removeAttribute("value");
            } else {
                view.value = model.value;
            }
            if (model.isSelected === null) {
                view.removeAttribute("selected");
            } else {
                view.selected = model.isSelected;
            }
        }

        protected parseCustomAttributes(model: Model.OptionModel, view: HTMLOptionElement): void {
            if (view.hasAttribute("disabled")) {
                model.isDisabled = view.disabled;
            }

            if (view.hasAttribute("label")) {
                model.label = view.label;
            }

            if (view.hasAttribute("value")) {
                model.value = view.value;
            }

            if (view.hasAttribute("selected")) {
                model.isSelected = view.selected;
            }
        }
    }
}