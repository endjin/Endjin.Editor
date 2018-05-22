/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />
/// <reference path="TableHeaderModel.ts" />
/// <reference path="TableFooterModel.ts" />

namespace Endjin.Editor.Model {
    export enum TableHeaderCellScope {
        Row = "row",
        Column = "col",
        RowGroup = "rowgroup",
        ColumnGroup = "colgroup",
        Auto = "auto"
    }

    export class TableHeaderCellModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.UnclassifiedContent}.tableheadercell`;
        get contentType(): string {
            return TableCellModel.ContentType;
        }

        columnSpan: number | null = null;
        rowSpan: number | null = null;
        abbreviation: string | null = null;
        scope: TableHeaderCellScope | null = null

        readonly acceptsTypes: string[] = [CommonModelTypes.FlowContent];

        canAccept(index: number, child: IModel): boolean {
            if (child.anyInTree((c) =>
                c.contentType.lastIndexOf(CommonModelTypes.HeadingContent, 0) >= 0 ||
                c.contentType.lastIndexOf(CommonModelTypes.SectioningContent, 0) >= 0 ||
                c.contentType === TableHeaderModel.ContentType ||
                c.contentType === TableFooterModel.ContentType)) {
                return false;
            }

            return super.canAccept(index, child);
        }
    }
}