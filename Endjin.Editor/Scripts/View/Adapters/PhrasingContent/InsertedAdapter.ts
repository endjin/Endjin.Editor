/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/InsertedModel.ts" />

namespace Endjin.Editor.View {
    export class InsertedAdapter extends ViewAdapterBase<HTMLModElement, Model.InsertedModel> {

        protected readonly adapterDisplayName: string = "inserted adapter";
        protected readonly modelContentType: string = Model.InsertedModel.ContentType;
        protected readonly viewTagName: string = "INS";

        protected createModelInstance(): Model.InsertedModel {
            return new Model.InsertedModel();
        }
        protected applyCustomAttributes(model: Model.InsertedModel, view: HTMLModElement): void {
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

        protected parseCustomAttributes(model: Model.InsertedModel, view: HTMLModElement): void {
            if (view.hasAttribute("cite")) {
                model.citeUri = view.cite;
            }
            if (view.hasAttribute("datetime")) {
                model.dateTime = view.dateTime;
            }
        }
    }
}