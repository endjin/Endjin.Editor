/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/DeleteModel.ts" />

namespace Endjin.Editor.View {
    export class DeleteAdapter extends ViewAdapterBase<HTMLModElement, Model.DeleteModel> {

        protected readonly adapterDisplayName: string = "delete adapter";
        protected readonly modelContentType: string = Model.DeleteModel.ContentType;
        protected readonly viewTagName: string = "DEL";

        protected createModelInstance(): Model.DeleteModel {
            return new Model.DeleteModel();
        }
        protected applyCustomAttributes(model: Model.DeleteModel, view: HTMLModElement): void {
            if (model.citeUri === null) {
                view.removeAttribute("cite");
            } else {
                view.cite = model.citeUri;
            }

            if (model.dateTime === null) {
                view.removeAttribute("datetime");
            } else {
                view.dateTime = model.dateTime;
            }
        }

        protected parseCustomAttributes(model: Model.DeleteModel, view: HTMLModElement): void {
            if (view.hasAttribute("cite")) {
                model.citeUri = view.cite;
            }
            if (view.hasAttribute("datetime")) {
                model.dateTime = view.dateTime;
            }
        }
    }
}