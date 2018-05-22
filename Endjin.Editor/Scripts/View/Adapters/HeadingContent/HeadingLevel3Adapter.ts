/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/HeadingContent/HeadingLevel3Model.ts" />

namespace Endjin.Editor.View {
    export class HeadingLevel3Adapter extends ViewAdapterBase<HTMLHeadingElement, Model.HeadingLevel3Model> {

        protected readonly adapterDisplayName: string = "heading level 3 adapter";
        protected readonly modelContentType: string = Model.HeadingLevel3Model.ContentType;
        protected readonly viewTagName: string = "H3";

        protected createModelInstance(): Model.HeadingLevel3Model {
            return new Model.HeadingLevel3Model();
        }
    }
}