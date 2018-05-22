/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class DetailsModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.FlowContent}.details`;

        isOpen: boolean = false;

        get contentType(): string {
            return DetailsModel.ContentType;
        }

        readonly isInteractive: boolean = true;

        readonly acceptsTypes: string[] = [CommonModelTypes.PhrasingContent, CommonModelTypes.HeadingContent];

        canAccept(index: number, child: IModel): boolean {
            if (child.contentType.lastIndexOf(CommonModelTypes.HeadingContent, 0) === 0) {
                if (this.children.length !== 0) {
                    return false;
                }
            }

            if (this.children.length === 1 && this.children[0].contentType.lastIndexOf(CommonModelTypes.HeadingContent) === 0) {
                return false;
            }

            return super.canAccept(index, child);
        }
    }
}