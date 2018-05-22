/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/UnclassifiedContent/OptionGroupModel.ts" />

namespace Endjin.Editor.View {
    export class OptionGroupAdapter extends ViewAdapterBase<HTMLOptGroupElement, Model.OptionGroupModel> {

        protected readonly adapterDisplayName: string = "option group adapter";
        protected readonly modelContentType: string = Model.OptionGroupModel.ContentType;
        protected readonly viewTagName: string = "OPTGROUP";

        protected createModelInstance(): Model.OptionGroupModel {
            return new Model.OptionGroupModel();
        }

        protected applyCustomAttributes(model: Model.OptionGroupModel, view: HTMLOptGroupElement): void {
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
        }

        protected parseCustomAttributes(model: Model.OptionGroupModel, view: HTMLOptGroupElement): void {
            if (view.hasAttribute("disabled")) {
                model.isDisabled = view.disabled;
            }

            if (view.hasAttribute("label")) {
                model.label = view.label;
            }
        }
    }
}