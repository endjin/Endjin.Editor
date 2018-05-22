/// <reference path="InputAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/InputWeekModel.ts" />

namespace Endjin.Editor.View {
    export class InputWeekAdapter extends InputAdapterBase<Model.InputUrlModel> {
        protected readonly modelContentType: string = Model.InputWeekModel.ContentType;
        protected readonly adapterDisplayName: string = "input week";
        protected readonly inputElementType: string = "week";

        protected createModelInstance(): Model.InputWeekModel {
            return new Model.InputWeekModel();
        }
    }
}