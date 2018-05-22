/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/FlowContent/UnorderedListModel.ts" />

namespace Endjin.Editor.View {
    export class UnorderedListAdapter extends ViewAdapterBase<HTMLUListElement, Model.UnorderedListModel> {

        protected readonly adapterDisplayName: string = "unordered list adapter";
        protected readonly modelContentType: string = Model.UnorderedListModel.ContentType;
        protected readonly viewTagName: string = "UL";

        protected createModelInstance(): Model.UnorderedListModel {
            return new Model.UnorderedListModel();
        }
    }
}