/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/FlowContent/DescriptionListModel.ts" />

namespace Endjin.Editor.View {
    export class DescriptionListAdapter extends ViewAdapterBase<HTMLDListElement, Model.DescriptionListModel> {

        protected readonly adapterDisplayName: string = "description list adapter";
        protected readonly modelContentType: string = Model.DescriptionListModel.ContentType;
        protected readonly viewTagName: string = "DL";

        protected createModelInstance(): Model.DescriptionListModel {
            return new Model.DescriptionListModel();
        }
    }
}