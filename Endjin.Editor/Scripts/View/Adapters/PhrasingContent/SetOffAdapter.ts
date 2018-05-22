/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/SetOffModel.ts" />

namespace Endjin.Editor.View {
    export class SetOffAdapter extends ViewAdapterBase<HTMLElement, Model.SetOffModel> {

        protected readonly adapterDisplayName: string = "set off adapter";
        protected readonly modelContentType: string = Model.SetOffModel.ContentType;
        protected readonly viewTagName: string = "I";

        protected createModelInstance(): Model.SetOffModel {
            return new Model.SetOffModel();
        }
    }
}