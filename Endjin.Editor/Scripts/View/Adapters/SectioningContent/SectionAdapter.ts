/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/SectioningContent/SectionModel.ts" />

namespace Endjin.Editor.View {
    export class SectionAdapter extends ViewAdapterBase<HTMLElement, Model.SectionModel> {

        protected readonly adapterDisplayName: string = "section adapter";
        protected readonly modelContentType: string = Model.SectionModel.ContentType;
        protected readonly viewTagName: string = "SECTION";

        protected createModelInstance(): Model.SectionModel {
            return new Model.SectionModel();
        }
    }
}