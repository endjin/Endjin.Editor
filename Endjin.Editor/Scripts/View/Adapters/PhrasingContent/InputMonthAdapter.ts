/// <reference path="InputAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/InputMonthModel.ts" />

namespace Endjin.Editor.View {
    export class InputMonthAdapter extends InputAdapterBase<Model.InputMonthModel> {
        protected readonly modelContentType: string = Model.InputMonthModel.ContentType;
        protected readonly adapterDisplayName: string = "input month";
        protected readonly inputElementType: string = "month";

        protected createModelInstance(): Model.InputMonthModel {
            return new Model.InputMonthModel();
        }
    }
}