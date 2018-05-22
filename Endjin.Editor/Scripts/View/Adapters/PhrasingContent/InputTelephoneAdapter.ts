/// <reference path="InputAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/InputTelephoneModel.ts" />

namespace Endjin.Editor.View {
    export class InputTelephoneAdapter extends InputAdapterBase<Model.InputTelephoneModel> {
        protected readonly modelContentType: string = Model.InputTelephoneModel.ContentType;
        protected readonly adapterDisplayName: string = "input telephone";
        protected readonly inputElementType: string = "telephone";

        protected createModelInstance(): Model.InputTelephoneModel {
            return new Model.InputTelephoneModel();
        }
    }
}