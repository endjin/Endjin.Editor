/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />
/// <reference path="../UnclassifiedContent/TextModel.ts" />
/// <reference path="../UnclassifiedContent/ListItemModel.ts" />

namespace Endjin.Editor.Model {
    export class UnorderedListModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.FlowContent}.unorderedlist`;

        get contentType(): string {
            return UnorderedListModel.ContentType;
        }

        readonly acceptsTypes: string[] = [ListItemModel.ContentType, TextModel.ContentType];
    }
}