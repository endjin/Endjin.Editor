/// <reference path="InputAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/InputNumberModel.ts" />

namespace Endjin.Editor.View {
    export class InputNumberAdapter extends InputAdapterBase<Model.InputNumberModel> {
        protected readonly modelContentType: string = Model.InputNumberModel.ContentType;
        protected readonly adapterDisplayName: string = "input number";
        protected readonly inputElementType: string = "number";

        protected createModelInstance(): Model.InputNumberModel {
            return new Model.InputNumberModel();
        }
    }
}