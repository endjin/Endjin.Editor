/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class ArticleModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.SectioningContent}.article`;

        get contentType(): string {
            return ArticleModel.ContentType;
        }

        readonly acceptsTypes: string[] = [CommonModelTypes.FlowContent];
    }
}