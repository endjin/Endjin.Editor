/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/EmphasisModel.ts" />

namespace Endjin.Editor.View {
    export class EmphasisAdapter extends ViewAdapterBase<HTMLElement, Model.EmphasisModel> {

        protected readonly adapterDisplayName: string = "emphasis adapter";
        protected readonly modelContentType: string = Model.EmphasisModel.ContentType;
        protected readonly viewTagName: string = "EM";

        protected createModelInstance(): Model.EmphasisModel {
            return new Model.EmphasisModel();
        }
    }
}