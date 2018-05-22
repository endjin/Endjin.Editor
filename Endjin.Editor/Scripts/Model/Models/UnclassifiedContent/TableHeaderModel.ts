/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />
/// <reference path="TableRowModel.ts" />
/// <reference path="TextModel.ts" />

namespace Endjin.Editor.Model {
    export class TableHeaderModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.UnclassifiedContent}.tableheader`;
        get contentType(): string {
            return TableHeaderModel.ContentType;
        }

        readonly acceptsTypes: string[] = [TableRowModel.ContentType, TextModel.ContentType];
    }
}