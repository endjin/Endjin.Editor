/// <reference path="InputAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/InputSubmitModel.ts" />

namespace Endjin.Editor.View {
    export class InputSubmitAdapter extends InputAdapterBase<Model.InputSubmitModel> {
        protected readonly modelContentType: string = Model.InputSubmitModel.ContentType;
        protected readonly adapterDisplayName: string = "input submit";
        protected readonly inputElementType: string = "submit";

        protected createModelInstance(): Model.InputSubmitModel {
            return new Model.InputSubmitModel();
        }
    }
}