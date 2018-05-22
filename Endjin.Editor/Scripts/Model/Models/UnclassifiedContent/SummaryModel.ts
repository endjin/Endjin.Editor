/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class SummaryModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.UnclassifiedContent}.summary`;

        get contentType(): string {
            return SummaryModel.ContentType;
        }

        readonly acceptsTypes: string[] = [SummaryModel.ContentType, CommonModelTypes.PhrasingContent];

        canAccept(index: number, child: IModel): boolean {
            if (child.contentType === SummaryModel.ContentType) {
                if (!(this.children.length === 0 || (this.children[0].contentType !== SummaryModel.ContentType && index === 0))) {
                    return false;
                }
            }

            return super.canAccept(index, child);
        }
    }
}