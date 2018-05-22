/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />
/// <reference path="TableCellModel.ts" />
/// <reference path="TableHeaderCellModel.ts" />
/// <reference path="../UnclassifiedContent/TextModel.ts" />
/// <reference path="TextModel.ts" />

namespace Endjin.Editor.Model {
    export class TableRowModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.UnclassifiedContent}.tablerow`;
        get contentType(): string {
            return TableRowModel.ContentType;
        }

        readonly acceptsTypes: string[] = [TableCellModel.ContentType, TableHeaderCellModel.ContentType, TextModel.ContentType];
    }
}