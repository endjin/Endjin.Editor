/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/SectioningContent/AsideModel.ts" />

namespace Endjin.Editor.View {
    export class AsideAdapter extends ViewAdapterBase<HTMLElement, Model.AsideModel> {

        protected readonly adapterDisplayName: string = "aside adapter";
        protected readonly modelContentType: string = Model.AsideModel.ContentType;
        protected readonly viewTagName: string = "ASIDE";

        protected createModelInstance(): Model.AsideModel {
            return new Model.AsideModel();
        }
    }
}