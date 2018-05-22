/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/HeadingContent/HeadingLevel1Model.ts" />

namespace Endjin.Editor.View {
    export class HeadingLevel1Adapter extends ViewAdapterBase<HTMLHeadingElement, Model.HeadingLevel1Model> {

        protected readonly adapterDisplayName: string = "heading level 1 adapter";
        protected readonly modelContentType: string = Model.HeadingLevel1Model.ContentType;
        protected readonly viewTagName: string = "H1";

        protected createModelInstance(): Model.HeadingLevel1Model {
            return new Model.HeadingLevel1Model();
        }
    }
}