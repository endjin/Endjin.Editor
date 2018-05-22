/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />
/// <reference path="HeaderModel.ts" />
/// <reference path="../SectioningContent/AsideModel.ts" />
/// <reference path="FooterModel.ts" />
/// <reference path="../SectioningContent/ArticleModel.ts" />

namespace Endjin.Editor.Model {
    export class AddressModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.FlowContent}.address`;

        get contentType(): string {
            return AddressModel.ContentType;
        }

        readonly acceptsTypes: string[] = [CommonModelTypes.FlowContent];

        canAccept(index: number, child: IModel): boolean {
            if (child.anyInTree((c) => {
                return c.contentType === AddressModel.ContentType ||
                    c.contentType === HeaderModel.ContentType ||
                    c.contentType === AsideModel.ContentType ||
                    c.contentType === FooterModel.ContentType ||
                    c.contentType === ArticleModel.ContentType ||
                    c.contentType.lastIndexOf(CommonModelTypes.HeadingContent, 0) === 0 ||
                    c.contentType.lastIndexOf(CommonModelTypes.SectioningContent, 0) === 0;
            })) {
                return false;
            }

            return super.canAccept(index, child);
        }
    }
}