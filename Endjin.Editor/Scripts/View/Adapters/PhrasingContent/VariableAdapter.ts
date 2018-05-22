/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/VariableModel.ts" />

namespace Endjin.Editor.View {
    export class VariableAdapter extends ViewAdapterBase<HTMLElement, Model.VariableModel> {

        protected readonly adapterDisplayName: string = "variable adapter";
        protected readonly modelContentType: string = Model.VariableModel.ContentType;
        protected readonly viewTagName: string = "VAR";

        protected createModelInstance(): Model.VariableModel {
            return new Model.VariableModel();
        }
    }
}