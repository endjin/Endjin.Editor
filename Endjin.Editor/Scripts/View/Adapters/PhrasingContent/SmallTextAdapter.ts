/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/SmallTextModel.ts" />

namespace Endjin.Editor.View {
    export class SmallTextAdapter extends ViewAdapterBase<HTMLElement, Model.SmallTextModel> {

        protected readonly adapterDisplayName: string = "small text adapter";
        protected readonly modelContentType: string = Model.SmallTextModel.ContentType;
        protected readonly viewTagName: string = "SMALL";

        protected createModelInstance(): Model.SmallTextModel {
            return new Model.SmallTextModel();
        }
    }
}