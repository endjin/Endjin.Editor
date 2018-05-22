/// <reference path="InputAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/InputDateModel.ts" />
namespace Endjin.Editor.View {
    export class InputDateAdapter extends InputAdapterBase<Model.InputDateModel> {
        protected readonly modelContentType: string = Model.InputDateModel.ContentType;
        protected readonly adapterDisplayName: string = "input date";
        protected readonly inputElementType: string = "date";

        protected createModelInstance(): Model.InputDateModel {
            return new Model.InputDateModel();
        }
    }
}