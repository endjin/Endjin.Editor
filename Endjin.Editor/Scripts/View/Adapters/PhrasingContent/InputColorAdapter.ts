/// <reference path="InputAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/InputColorModel.ts" />

namespace Endjin.Editor.View {
    export class InputColorAdapter extends InputAdapterBase<Model.InputColorModel> {
        protected readonly modelContentType: string = Model.InputColorModel.ContentType;
        protected readonly adapterDisplayName: string = "input color";
        protected readonly inputElementType: string = "color";

        protected createModelInstance(): Model.InputColorModel {
            return new Model.InputColorModel();
        }
    }
}