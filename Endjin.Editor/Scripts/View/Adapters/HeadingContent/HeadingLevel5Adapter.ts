/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/HeadingContent/HeadingLevel5Model.ts" />

namespace Endjin.Editor.View {
    export class HeadingLevel5Adapter extends ViewAdapterBase<HTMLHeadingElement, Model.HeadingLevel5Model> {

        protected readonly adapterDisplayName: string = "heading level 5 adapter";
        protected readonly modelContentType: string = Model.HeadingLevel5Model.ContentType;
        protected readonly viewTagName: string = "H5";

        protected createModelInstance(): Model.HeadingLevel5Model {
            return new Model.HeadingLevel5Model();
        }
    }
}