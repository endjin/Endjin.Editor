/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/StrikethroughModel.ts" />

namespace Endjin.Editor.View {
    export class StrikethroughAdapter extends ViewAdapterBase<HTMLElement, Model.StrikethroughModel> {

        protected readonly adapterDisplayName: string = "strikethrough adapter";
        protected readonly modelContentType: string = Model.StrikethroughModel.ContentType;
        protected readonly viewTagName: string = "S";

        protected createModelInstance(): Model.StrikethroughModel {
            return new Model.StrikethroughModel();
        }
    }
}