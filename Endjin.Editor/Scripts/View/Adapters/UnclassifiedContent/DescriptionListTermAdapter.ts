/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/UnclassifiedContent/DescriptionListTermModel.ts" />

namespace Endjin.Editor.View {
    export class DescriptionListTermAdapter extends ViewAdapterBase<HTMLElement, Model.DescriptionListTermModel> {

        protected readonly adapterDisplayName: string = "description list term adapter";
        protected readonly modelContentType: string = Model.DescriptionListTermModel.ContentType;
        protected readonly viewTagName: string = "DT";

        protected createModelInstance(): Model.DescriptionListTermModel {
            return new Model.DescriptionListTermModel();
        }
    }
}