/// <reference path="InputAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/InputPasswordModel.ts" />

namespace Endjin.Editor.View {
    export class InputPasswordAdapter extends InputAdapterBase<Model.InputPasswordModel> {
        protected readonly modelContentType: string = Model.InputPasswordModel.ContentType;
        protected readonly adapterDisplayName: string = "input password";
        protected readonly inputElementType: string = "password";

        protected createModelInstance(): Model.InputPasswordModel {
            return new Model.InputPasswordModel();
        }
    }
}