/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/FlowContent/OrderedListModel.ts" />

namespace Endjin.Editor.View {
    export class OrderedListAdapter extends ViewAdapterBase<HTMLOListElement, Model.OrderedListModel> {

        protected readonly adapterDisplayName: string = "ordered list adapter";
        protected readonly modelContentType: string = Model.OrderedListModel.ContentType;
        protected readonly viewTagName: string = "OL";

        protected createModelInstance(): Model.OrderedListModel {
            return new Model.OrderedListModel();
        }

        protected applyCustomAttributes(model: Model.OrderedListModel, view: HTMLOListElement): void {
            if (model.start === null) {
                view.removeAttribute("start");
            } else {
                view.start = model.start;
            }
            if (model.type === null) {
                view.removeAttribute("type");
            } else {
                view.type = model.type;
            }
        }

        protected parseCustomAttributes(model: Model.OrderedListModel, view: HTMLOListElement): void {
            if (view.hasAttribute("start")) {
                model.start = view.start;
            }

            if (view.hasAttribute("type")) {
                model.type = <Model.NumberingType>view.type;
            }
        }
    }
}