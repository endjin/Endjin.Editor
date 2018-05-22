/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/DataListModel.ts" />

namespace Endjin.Editor.View {
    export class DataListAdapter extends ViewAdapterBase<HTMLDataListElement, Model.DataListModel> {

        protected readonly adapterDisplayName: string = "data list adapter";
        protected readonly modelContentType: string = Model.DataListModel.ContentType;
        protected readonly viewTagName: string = "DATALIST";

        protected createModelInstance(): Model.DataListModel {
            return new Model.DataListModel();
        }
    }
}