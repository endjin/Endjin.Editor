/// <reference path="InputAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/InputTimeModel.ts" />

namespace Endjin.Editor.View {
    export class InputTimeAdapter extends InputAdapterBase<Model.InputTimeModel> {
        protected readonly modelContentType: string = Model.InputTimeModel.ContentType;
        protected readonly adapterDisplayName: string = "input time";
        protected readonly inputElementType: string = "time";

        protected createModelInstance(): Model.InputTimeModel {
            return new Model.InputTimeModel();
        }
    }
}