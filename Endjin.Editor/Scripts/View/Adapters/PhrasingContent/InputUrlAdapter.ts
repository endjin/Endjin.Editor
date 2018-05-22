/// <reference path="InputAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/InputUrlModel.ts" />

namespace Endjin.Editor.View {
    export class InputUrlAdapter extends InputAdapterBase<Model.InputUrlModel> {
        protected readonly modelContentType: string = Model.InputUrlModel.ContentType;
        protected readonly adapterDisplayName: string = "input URL";
        protected readonly inputElementType: string = "url";

        protected createModelInstance(): Model.InputUrlModel {
            return new Model.InputUrlModel();
        }
    }
}