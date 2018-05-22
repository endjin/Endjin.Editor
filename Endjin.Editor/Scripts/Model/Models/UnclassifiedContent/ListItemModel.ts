/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class ListItemModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.UnclassifiedContent}.listitem`;

        value: number | null = null;

        get contentType(): string {
            return ListItemModel.ContentType;
        }

        readonly acceptsTypes: string[] = [CommonModelTypes.FlowContent];
    }
}