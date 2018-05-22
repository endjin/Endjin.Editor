/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/CodeModel.ts" />

namespace Endjin.Editor.View {
    export class CodeAdapter extends ViewAdapterBase<HTMLElement, Model.CodeModel> {

        protected readonly adapterDisplayName: string = "code adapter";
        protected readonly modelContentType: string = Model.CodeModel.ContentType;
        protected readonly viewTagName: string = "CODE";

        protected createModelInstance(): Model.CodeModel {
            return new Model.CodeModel();
        }
    }
}