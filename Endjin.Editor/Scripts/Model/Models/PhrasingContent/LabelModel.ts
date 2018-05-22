/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class LabelModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.PhrasingContent}.label`;

        targetModelId: string = "";

        get contentType(): string {
            return LabelModel.ContentType;
        }

        readonly isInteractive: boolean = true;

        readonly acceptsTypes: string[] = [CommonModelTypes.PhrasingContent];

        canAccept(index: number, child: IModel): boolean {
            if (child.anyInTree((c) => c.contentType === LabelModel.ContentType)) {
                return false;
            }

            return super.canAccept(index, child);
        }
    }
}