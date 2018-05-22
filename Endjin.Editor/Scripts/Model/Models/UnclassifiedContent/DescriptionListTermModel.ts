/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />
/// <reference path="../FlowContent/HeaderModel.ts" />
/// <reference path="../FlowContent/FooterModel.ts" />

namespace Endjin.Editor.Model {
    export class DescriptionListTermModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.UnclassifiedContent}.descriptionlistterm`;

        get contentType(): string {
            return DescriptionListTermModel.ContentType;
        }

        readonly acceptsTypes: string[] = [CommonModelTypes.FlowContent];

        canAccept(index: number, child: IModel): boolean {
            if (child.anyInTree((c) =>
                c.contentType.lastIndexOf(CommonModelTypes.HeadingContent, 0) === 0 ||
                c.contentType.lastIndexOf(CommonModelTypes.SectioningContent, 0) === 0 ||
                c.contentType === HeaderModel.ContentType ||
                c.contentType === FooterModel.ContentType)) {
                return false;
            }

            return super.canAccept(index, child);
        }
    }
}