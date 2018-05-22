/// <reference path="InputAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/InputButtonModel.ts" />

namespace Endjin.Editor.View {
    export class InputButtonAdapter extends InputAdapterBase<Model.InputButtonModel> {
        protected readonly modelContentType: string = Model.InputButtonModel.ContentType;
        protected readonly adapterDisplayName: string = "input button";
        protected readonly inputElementType: string = "button";

        protected createModelInstance(): Model.InputButtonModel {
            return new Model.InputButtonModel();
        }
    }
}