/// <reference path="InputAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/InputTextModel.ts" />

namespace Endjin.Editor.View {
    export class InputTextAdapter extends InputAdapterBase<Model.InputTextModel> {
        protected readonly modelContentType: string = Model.InputTextModel.ContentType;
        protected readonly adapterDisplayName: string = "input text";
        protected readonly inputElementType: string = "text";

        protected createModelInstance(): Model.InputTextModel {
            return new Model.InputTextModel();
        }
    }
}