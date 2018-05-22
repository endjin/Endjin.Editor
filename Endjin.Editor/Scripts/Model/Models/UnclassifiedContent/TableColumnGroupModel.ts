/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />
/// <reference path="TableColumnModel.ts" />
/// <reference path="TextModel.ts" />

namespace Endjin.Editor.Model {
    export class TableColumnGroupModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.UnclassifiedContent}.tablecolumngroup`;
        private _span: number | null = null;

        get span(): number | null {
            return this._span;
        };

        set span(value: number | null) {
            // You cannot set the span if you have columns
            if (this.childCount > 0 && value !== null) {
                return;
            }
            this._span = value;
        }

        get contentType(): string {
            return TableColumnGroupModel.ContentType;
        }

        readonly acceptsTypes: string[] = [TableColumnModel.ContentType, TextModel.ContentType];

        canAccept(index: number, child: IModel): boolean {
            if (this.span !== null) {
                return false;
            }

            return super.canAccept(index, child);
        }
    }
}