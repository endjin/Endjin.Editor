/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/UnclassifiedContent/SummaryModel.ts" />

namespace Endjin.Editor.View {
    export class SummaryAdapter extends ViewAdapterBase<HTMLSummaryElement, Model.SummaryModel> {
        protected readonly adapterDisplayName: string = "summary adapter";
        protected readonly modelContentType: string = Model.SummaryModel.ContentType;
        protected readonly viewTagName: string = "SUMMARY";

        protected createModelInstance(): Model.SummaryModel {
            return new Model.SummaryModel();
        }
    }
}