/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/SelectModel.ts" />

namespace Endjin.Editor.View {
    export class SelectAdapter extends ViewAdapterBase<HTMLSelectElement, Model.SelectModel> {

        protected readonly adapterDisplayName: string = "select adapter";
        protected readonly modelContentType: string = Model.SelectModel.ContentType;
        protected readonly viewTagName: string = "SELECT";

        protected createModelInstance(): Model.SelectModel {
            return new Model.SelectModel();
        }
        protected applyCustomAttributes(model: Model.SelectModel, view: HTMLSelectElement): void {
            if (model.autofocus === null) {
                view.removeAttribute("autofocus");
            } else {
                view.autofocus = model.autofocus;
            }

            if (model.allowMultiple === null) {
                view.removeAttribute("multiple");
            } else {
                view.multiple = model.allowMultiple;
            }

            if (model.isDisabled === null) {
                view.removeAttribute("disabled");
            } else {
                view.disabled = model.isDisabled;
            }

            if (model.isRequired === null) {
                view.removeAttribute("required");
            } else {
                view.required = model.isRequired;
            }

            if (model.size === null) {
                view.removeAttribute("size");
            } else {
                view.size = model.size;
            }
        }

        protected parseCustomAttributes(model: Model.SelectModel, view: HTMLSelectElement): void {
            if (view.hasAttribute("autofocus")) {
                model.autofocus = view.autofocus;
            }

            if (view.hasAttribute("multiple")) {
                model.allowMultiple = view.multiple;
            }

            if (view.hasAttribute("disabled")) {
                model.isDisabled = view.disabled;
            }

            if (view.hasAttribute("required")) {
                model.isRequired = view.required;
            }

            if (view.hasAttribute("size")) {
                model.size = view.size;
            }
        }
    }
}