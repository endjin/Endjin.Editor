/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />
/// <reference path="TableRowModel.ts" />
/// <reference path="TextModel.ts" />

namespace Endjin.Editor.Model {
    export class TableFooterModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.UnclassifiedContent}.tablefooter`;
        get contentType(): string {
            return TableFooterModel.ContentType;
        }

        readonly acceptsTypes: string[] = [TableRowModel.ContentType, TextModel.ContentType];
    }
}