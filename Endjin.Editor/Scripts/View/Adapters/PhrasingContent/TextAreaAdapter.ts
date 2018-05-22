/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/TextAreaModel.ts" />

namespace Endjin.Editor.View {
    export class TextAreaAdapter extends ViewAdapterBase<HTMLTextAreaElement, Model.TextAreaModel> {

        protected readonly adapterDisplayName: string = "text area adapter";
        protected readonly modelContentType: string = Model.TextAreaModel.ContentType;
        protected readonly viewTagName: string = "TEXTAREA";

        protected createModelInstance(): Model.TextAreaModel {
            return new Model.TextAreaModel();
        }
        protected applyCustomAttributes(model: Model.TextAreaModel, view: HTMLTextAreaElement): void {
            view.autofocus = model.autofocus;
            view.cols = model.columns;
            if (model.rows === null) {
                view.removeAttribute("rows");
            } else {
                view.rows = model.rows;
            }
            if (model.isDisabled === null) {
                view.removeAttribute("disabled");
            } else {
                view.disabled = model.isDisabled;
            }
            if (model.maximumLength === null) {
                view.removeAttribute("maxlength");
            } else {
                view.maxLength = model.maximumLength;
            }
            if (model.minimumLength === null) {
                view.removeAttribute("minlength");
            } else {
                view.minLength = model.minimumLength;
            }
            if (model.isReadOnly === null) {
                view.removeAttribute("readonly");
            } else {
                view.readOnly = model.isReadOnly;
            }

            if (model.spellCheck === null) {
                view.removeAttribute("spellcheck");
            } else {
                view.spellcheck = model.spellCheck;
            }

            if (model.wrap === null) {
                view.removeAttribute("wrap");
            } else {
                view.wrap = model.wrap;
            }
        }

        protected parseCustomAttributes(model: Model.TextAreaModel, view: HTMLTextAreaElement): void {
            if (view.hasAttribute("rows")) {
                model.rows = view.rows;
            }

            if (view.hasAttribute("disabled")) {
                model.isDisabled = view.disabled;
            }

            if (view.hasAttribute("maxlength")) {
                model.maximumLength = view.maxLength;
            }

            if (view.hasAttribute("minlength")) {
                model.minimumLength = view.minLength;
            }

            if (view.hasAttribute("readonly")) {
                model.isReadOnly = view.readOnly;
            }

            if (view.hasAttribute("spellcheck")) {
                model.spellCheck = view.spellcheck;
            }

            if (view.hasAttribute("wrap")) {
                model.wrap = <Model.TextWrapping>view.wrap;
            }
        }
    }
}