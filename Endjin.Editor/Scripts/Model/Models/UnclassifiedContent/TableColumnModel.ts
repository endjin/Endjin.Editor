/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class TableColumnModel extends EmptyContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.UnclassifiedContent}.tablecolumn`;

        span: number | null = null;

        get contentType(): string {
            return TableColumnModel.ContentType;
        }
    }
}