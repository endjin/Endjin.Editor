/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/SuperscriptModel.ts" />

namespace Endjin.Editor.View {
    export class SuperscriptAdapter extends ViewAdapterBase<HTMLElement, Model.SuperscriptModel> {

        protected readonly adapterDisplayName: string = "superscript adapter";
        protected readonly modelContentType: string = Model.SuperscriptModel.ContentType;
        protected readonly viewTagName: string = "SUP";

        protected createModelInstance(): Model.SuperscriptModel {
            return new Model.SuperscriptModel();
        }
    }
}