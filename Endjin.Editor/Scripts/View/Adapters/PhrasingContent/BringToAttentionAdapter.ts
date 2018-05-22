/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/BringToAttentionModel.ts" />

namespace Endjin.Editor.View {
    export class BringToAttentionAdapter extends ViewAdapterBase<HTMLElement, Model.BringToAttentionModel> {

        protected readonly adapterDisplayName: string = "bring to attention adapter";
        protected readonly modelContentType: string = Model.BringToAttentionModel.ContentType;
        protected readonly viewTagName: string = "B";

        protected createModelInstance(): Model.BringToAttentionModel {
            return new Model.BringToAttentionModel();
        }
    }
}