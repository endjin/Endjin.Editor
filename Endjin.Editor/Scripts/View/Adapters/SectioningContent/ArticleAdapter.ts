/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/SectioningContent/ArticleModel.ts" />

namespace Endjin.Editor.View {
    export class ArticleAdapter extends ViewAdapterBase<HTMLElement, Model.ArticleModel> {

        protected readonly adapterDisplayName: string = "article adapter";
        protected readonly modelContentType: string = Model.ArticleModel.ContentType;
        protected readonly viewTagName: string = "ARTICLE";

        protected createModelInstance(): Model.ArticleModel {
            return new Model.ArticleModel();
        }
    }
}