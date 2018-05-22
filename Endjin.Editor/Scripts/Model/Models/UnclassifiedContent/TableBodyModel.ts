/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />
/// <reference path="TableRowModel.ts" />
/// <reference path="TextModel.ts" />

namespace Endjin.Editor.Model {
    export class TableBodyModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.UnclassifiedContent}.tablebody`;
        get contentType(): string {
            return TableBodyModel.ContentType;
        }

        readonly acceptsTypes: string[] = [TableRowModel.ContentType, TextModel.ContentType];
    }
}