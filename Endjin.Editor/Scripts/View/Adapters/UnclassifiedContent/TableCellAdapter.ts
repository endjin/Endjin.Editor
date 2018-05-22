/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/UnclassifiedContent/TableCellModel.ts" />

namespace Endjin.Editor.View {
    export class TableCellAdapter extends ViewAdapterBase<HTMLTableCellElement, Model.TableCellModel> {

        protected readonly adapterDisplayName: string = "table cell adapter";
        protected readonly modelContentType: string = Model.TableCellModel.ContentType;
        protected readonly viewTagName: string = "TD";

        protected createModelInstance(): Model.TableCellModel {
            return new Model.TableCellModel();
        }

        protected applyCustomAttributes(model: Model.TableCellModel, view: HTMLTableCellElement): void {
            if (model.columnSpan === null) {
                view.removeAttribute("colspan");
            } else {
                view.colSpan = model.columnSpan;
            }

            if (model.rowSpan === null) {
                view.removeAttribute("rowspan");
            } else {
                view.rowSpan = model.rowSpan;
            }
        }

        protected parseCustomAttributes(model: Model.TableCellModel, view: HTMLTableCellElement): void {
            if (view.hasAttribute("colspan")) {
                model.columnSpan = view.colSpan;
            }

            if (view.hasAttribute("rowspan")) {
                model.rowSpan = view.rowSpan;
            }
        }
    }
}