/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/HeadingContent/HeadingLevel6Model.ts" />

namespace Endjin.Editor.View {
    export class HeadingLevel6Adapter extends ViewAdapterBase<HTMLHeadingElement, Model.HeadingLevel6Model> {

        protected readonly adapterDisplayName: string = "heading level 6 adapter";
        protected readonly modelContentType: string = Model.HeadingLevel6Model.ContentType;
        protected readonly viewTagName: string = "H6";

        protected createModelInstance(): Model.HeadingLevel6Model {
            return new Model.HeadingLevel6Model();
        }
    }
}