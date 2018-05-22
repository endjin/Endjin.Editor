/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/FlowContent/FormModel.ts" />

namespace Endjin.Editor.View {
    export class FormAdapter extends ViewAdapterBase<HTMLFormElement, Model.FormModel> {

        protected readonly adapterDisplayName: string = "form adapter";
        protected readonly modelContentType: string = Model.FormModel.ContentType;
        protected readonly viewTagName: string = "FORM";

        protected createModelInstance(): Model.FormModel {
            return new Model.FormModel();
        }
        protected applyCustomAttributes(model: Model.FormModel, view: HTMLFormElement): void {
            if (model.acceptCharset.length > 0) {
                view.acceptCharset = model.acceptCharset.join(" ");
            } else {
                view.removeAttribute("acceptcharset");
            }
            view.action = model.actionUri
            view.autocomplete = model.autocomplete;
            view.enctype = model.encodingType;
            view.method = model.method;
            view.noValidate = model.noValidation;
            view.target = model.target;
        }

        protected parseCustomAttributes(model: Model.FormModel, view: HTMLFormElement): void {
            if (view.hasAttribute("acceptcharset")) {
                model.acceptCharset.push(...view.acceptCharset.split(" "));
            }
            model.actionUri = view.action;
            model.autocomplete = <Model.FormAutoComplete>view.autocomplete;
            model.encodingType = <Model.FormEncodingType>view.enctype;
            model.method = view.method;
            model.noValidation = view.noValidate;
            model.target = view.target;
        }
    }
}