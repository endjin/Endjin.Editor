/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/InputModelBase.ts" />

namespace Endjin.Editor.View {
    export abstract class InputAdapterBase<TModel extends Model.InputModelBase> extends ViewAdapterBase<HTMLInputElement, TModel> {
        protected abstract readonly inputElementType: string;

        protected readonly viewTagName: string = "INPUT";

        canParseView(element: HTMLElement): boolean {
            return super.canParseView(element) && (<HTMLInputElement>element).type === this.inputElementType;
        }

        protected applyCustomAttributes(model: TModel, view: HTMLInputElement): void {
            view.type = this.inputElementType;
            view.autocomplete = model.autocomplete;
            view.autofocus = model.autofocus;
            view.value = model.value;

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

            if (model.minimum === null) {
                view.removeAttribute("min");
            } else {
                view.min = model.minimum;
            }

            if (model.maximum === null) {
                view.removeAttribute("max");
            } else {
                view.max = model.maximum;
            }

            if (model.minimumLength === null) {
                view.removeAttribute("minlength");
            } else {
                view.minLength = model.minimumLength;
            }

            if (model.maximumLength === null) {
                view.removeAttribute("maxlength");
            } else {
                view.maxLength = model.maximumLength;
            }

            if (model.pattern === null) {
                view.removeAttribute("pattern");
            } else {
                view.pattern = model.pattern;
            }

            if (model.placeholder === null) {
                view.removeAttribute("placeholder");
            } else {
                view.placeholder = model.placeholder;
            }

            if (model.isReadOnly === null) {
                view.removeAttribute("readonly");
            } else {
                view.readOnly = model.isReadOnly;
            }

            if (model.isRequired === null) {
                view.removeAttribute("required");
            } else {
                view.required = model.isRequired;
            }

            if (model.selectionDirection === null) {
                view.removeAttribute("selectiondirection");
            } else {
                view.selectionDirection = model.selectionDirection;
            }

            view.selectionStart = model.selectionStart;
            view.selectionEnd = model.selectionEnd;

            if (model.spellCheck === null) {
                view.removeAttribute("spellcheck");
            } else {
                view.spellcheck = model.spellCheck;
            }
        }

        protected parseCustomAttributes(model: TModel, view: HTMLInputElement): void {
            model.autocomplete = <Model.AutocompleteOptions>view.autocomplete;
            model.autofocus = view.autofocus;
            model.value = view.value;
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
            if (view.hasAttribute("disabled")) {
                model.isDisabled = view.disabled;
            }
            if (view.hasAttribute("min")) {
                model.minimum = view.min;
            }
            if (view.hasAttribute("max")) {
                model.maximum = view.max;
            }
            if (view.hasAttribute("minlength")) {
                model.minimumLength = view.minLength;
            }
            if (view.hasAttribute("maxlength")) {
                model.maximumLength = view.maxLength;
            }
            if (view.hasAttribute("pattern")) {
                model.pattern = view.pattern;
            }
            if (view.hasAttribute("placeholder")) {
                model.placeholder = view.placeholder;
            }
            if (view.hasAttribute("readonly")) {
                model.isReadOnly = view.readOnly;
            }
            if (view.hasAttribute("required")) {
                model.isRequired = view.required;
            }
            if (view.hasAttribute("selectiondirection")) {
                model.selectionDirection = <Model.SelectionDirection>view.selectionDirection;
            }
            if (view.hasAttribute("spellcheck")) {
                model.spellCheck = view.spellcheck;
            }
        }
    }
}