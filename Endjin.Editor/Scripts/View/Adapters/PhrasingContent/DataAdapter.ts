/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/DataModel.ts" />

namespace Endjin.Editor.View {
    export class DataAdapter extends ViewAdapterBase<HTMLDataElement, Model.DataModel> {

        protected readonly adapterDisplayName: string = "data adapter";
        protected readonly modelContentType: string = Model.DataModel.ContentType;
        protected readonly viewTagName: string = "DATA";

        protected createModelInstance(): Model.DataModel {
            return new Model.DataModel();
        }
        protected applyCustomAttributes(model: Model.DataModel, view: HTMLDataElement): void {
            view.value = model.value;
        }

        protected parseCustomAttributes(model: Model.DataModel, view: HTMLDataElement): void {
            model.value = view.value;
        }
    }
}