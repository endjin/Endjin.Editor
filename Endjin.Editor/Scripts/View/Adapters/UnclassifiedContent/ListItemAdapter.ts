/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/UnclassifiedContent/ListItemModel.ts" />

namespace Endjin.Editor.View {
    export class ListItemAdapter extends ViewAdapterBase<HTMLLIElement, Model.ListItemModel> {

        protected readonly adapterDisplayName: string = "list item adapter";
        protected readonly modelContentType: string = Model.ListItemModel.ContentType;
        protected readonly viewTagName: string = "LI";

        protected createModelInstance(): Model.ListItemModel {
            return new Model.ListItemModel();
        }

        protected applyCustomAttributes(model: Model.ListItemModel, view: HTMLLIElement): void {
            if (model.value === null) {
                view.removeAttribute("value");
            } else {
                view.value = model.value;
            }
        }

        protected parseCustomAttributes(model: Model.ListItemModel, view: HTMLLIElement): void {
            if (view.hasAttribute("value")) {
                model.value = view.value;
            }
        }
    }
}