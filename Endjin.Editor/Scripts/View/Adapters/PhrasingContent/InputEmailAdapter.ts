/// <reference path="InputAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/InputEmailModel.ts" />

namespace Endjin.Editor.View {
    export class InputEmailAdapter extends InputAdapterBase<Model.InputEmailModel> {
        protected readonly modelContentType: string = Model.InputEmailModel.ContentType;
        protected readonly adapterDisplayName: string = "input email";
        protected readonly inputElementType: string = "email";

        protected createModelInstance(): Model.InputEmailModel {
            return new Model.InputEmailModel();
        }
    }
}