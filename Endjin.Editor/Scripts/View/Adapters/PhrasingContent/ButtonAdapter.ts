/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/ButtonModel.ts" />

namespace Endjin.Editor.View {
    export class ButtonAdapter extends ViewAdapterBase<HTMLButtonElement, Model.ButtonModel> {

        protected readonly adapterDisplayName: string = "button adapter";
        protected readonly modelContentType: string = Model.ButtonModel.ContentType;
        protected readonly viewTagName: string = "BUTTON";

        protected createModelInstance(): Model.ButtonModel {
            return new Model.ButtonModel();
        }

        protected applyCustomAttributes(model: Model.ButtonModel, view: HTMLButtonElement): void {
            view.autofocus = model.autofocus;

            if (model.formActionUri === null) {
                view.removeAttribute("formaction");
            } else {
                view.formAction = model.formActionUri;
            }

            if (model.formMethod === null) {
                view.removeAttribute("formmethod");
            } else {
                view.formMethod = model.formMethod;
            }

            if (model.formNoValidation === null) {
                view.removeAttribute("formnovalidate");
            } else {
                view.formNoValidate = model.formNoValidation;
            }

            if (model.formTarget === null) {
                view.removeAttribute("formtarget");
            } else {
                view.formTarget = model.formTarget;
            }

            if (model.formEncodingType === null) {
                view.removeAttribute("formenctype");
            } else {
                view.formEnctype = model.formEncodingType;
            }

            if (model.isDisabled === null) {
                view.removeAttribute("disabled");
            } else {
                view.disabled = model.isDisabled;
            }

            view.name = model.name;

            view.type = model.buttonType;
            view.value = model.value;
        }

        protected parseCustomAttributes(model: Model.ButtonModel, view: HTMLButtonElement): void {
            model.autofocus = view.autofocus;
            if (view.hasAttribute("formaction")) {
                model.formActionUri = view.formAction;
            }
            if (view.hasAttribute("formmethod")) {
                model.formMethod = view.formMethod;
            }
            if (view.hasAttribute("formnovalidate")) {
                model.formNoValidation = view.formNoValidate;
            }
            if (view.hasAttribute("formtarget")) {
                model.formTarget = view.formTarget;
            }
            if (view.hasAttribute("formenctype")) {
                model.formEncodingType = <Model.FormEncodingType>view.formEnctype;
            }
            if (view.hasAttribute("disabled")) {
                model.isDisabled = view.disabled;
            }
            model.name = view.name;
            model.buttonType = <Model.ButtonType>view.type;
            model.value = view.value;
        }
    }
}