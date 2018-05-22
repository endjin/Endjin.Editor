/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/UnclassifiedContent/DescriptionListDefinitionModel.ts" />

namespace Endjin.Editor.View {
    export class DescriptionListDefinitionAdapter extends ViewAdapterBase<HTMLElement, Model.DescriptionListDefinitionModel> {

        protected readonly adapterDisplayName: string = "description list definition adapter";
        protected readonly modelContentType: string = Model.DescriptionListDefinitionModel.ContentType;
        protected readonly viewTagName: string = "DD";

        protected createModelInstance(): Model.DescriptionListDefinitionModel {
            return new Model.DescriptionListDefinitionModel();
        }
    }
}