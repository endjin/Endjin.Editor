/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/HeadingContent/HeadingLevel4Model.ts" />

namespace Endjin.Editor.View {
    export class HeadingLevel4Adapter extends ViewAdapterBase<HTMLHeadingElement, Model.HeadingLevel4Model> {

        protected readonly adapterDisplayName: string = "heading level 4 adapter";
        protected readonly modelContentType: string = Model.HeadingLevel4Model.ContentType;
        protected readonly viewTagName: string = "H4";

        protected createModelInstance(): Model.HeadingLevel4Model {
            return new Model.HeadingLevel4Model();
        }
    }
}