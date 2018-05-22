/// <reference path="InputAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/InputSearchModel.ts" />

namespace Endjin.Editor.View {
    export class InputSearchAdapter extends InputAdapterBase<Model.InputSearchModel> {
        protected readonly modelContentType: string = Model.InputSearchModel.ContentType;
        protected readonly adapterDisplayName: string = "input search";
        protected readonly inputElementType: string = "search";

        protected createModelInstance(): Model.InputSearchModel {
            return new Model.InputSearchModel();
        }
    }
}