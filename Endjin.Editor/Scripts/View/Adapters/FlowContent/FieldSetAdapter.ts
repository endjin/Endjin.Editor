/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/FlowContent/FieldSetModel.ts" />

namespace Endjin.Editor.View {
    export class FieldSetAdapter extends ViewAdapterBase<HTMLFieldSetElement, Model.FieldSetModel> {

        protected readonly adapterDisplayName: string = "field set adapter";
        protected readonly modelContentType: string = Model.FieldSetModel.ContentType;
        protected readonly viewTagName: string = "FIELDSET";

        protected createModelInstance(): Model.FieldSetModel {
            return new Model.FieldSetModel();
        }
        protected applyCustomAttributes(model: Model.FieldSetModel, view: HTMLFieldSetElement): void {
            if (model.name === null) {
                view.removeAttribute("name");
            } else {
                view.name = model.name;
            }
            if (model.isDisabled === null) {
                view.removeAttribute("disabled");
            } else {
                view.disabled = model.isDisabled;
            }
        }

        protected parseCustomAttributes(model: Model.FieldSetModel, view: HTMLFieldSetElement): void {
            if (view.hasAttribute("name")) {
                model.name = view.name;
            }
            if (view.hasAttribute("disabled")) {
                model.isDisabled = view.disabled;
            }
        }
    }
}