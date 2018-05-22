/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/HeadingContent/HeadingLevel2Model.ts" />

namespace Endjin.Editor.View {
    export class HeadingLevel2Adapter extends ViewAdapterBase<HTMLHeadingElement, Model.HeadingLevel2Model> {

        protected readonly adapterDisplayName: string = "heading level 2 adapter";
        protected readonly modelContentType: string = Model.HeadingLevel2Model.ContentType;
        protected readonly viewTagName: string = "H2";

        protected createModelInstance(): Model.HeadingLevel2Model {
            return new Model.HeadingLevel2Model();
        }
    }
}