/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/CiteModel.ts" />

namespace Endjin.Editor.View {
    export class CiteAdapter extends ViewAdapterBase<HTMLElement, Model.CiteModel> {

        protected readonly adapterDisplayName: string = "cite adapter";
        protected readonly modelContentType: string = Model.CiteModel.ContentType;
        protected readonly viewTagName: string = "CITE";

        protected createModelInstance(): Model.CiteModel {
            return new Model.CiteModel();
        }
    }
}