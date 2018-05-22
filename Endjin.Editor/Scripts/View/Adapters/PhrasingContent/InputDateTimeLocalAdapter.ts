/// <reference path="InputAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/InputDateTimeLocalModel.ts" />

namespace Endjin.Editor.View {
    export class InputDateTimeLocalAdapter extends InputAdapterBase<Model.InputDateTimeLocalModel> {
        protected readonly modelContentType: string = Model.InputDateTimeLocalModel.ContentType;
        protected readonly adapterDisplayName: string = "input local datetime";
        protected readonly inputElementType: string = "datetime-local";

        protected createModelInstance(): Model.InputDateTimeLocalModel {
            return new Model.InputDateTimeLocalModel();
        }
    }
}