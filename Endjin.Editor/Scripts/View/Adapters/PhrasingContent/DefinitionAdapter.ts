/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/DefinitionModel.ts" />

namespace Endjin.Editor.View {
    export class DefinitionAdapter extends ViewAdapterBase<HTMLElement, Model.DefinitionModel> {

        protected readonly adapterDisplayName: string = "definition adapter";
        protected readonly modelContentType: string = Model.DefinitionModel.ContentType;
        protected readonly viewTagName: string = "DFN";

        protected createModelInstance(): Model.DefinitionModel {
            return new Model.DefinitionModel();
        }
    }
}