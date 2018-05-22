/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/UnclassifiedContent/TableHeaderCellModel.ts" />

namespace Endjin.Editor.View {
    export class TableHeaderCellAdapter extends ViewAdapterBase<HTMLTableHeaderCellElement, Model.TableHeaderCellModel> {
        protected readonly adapterDisplayName: string = "table header cell adapter";
        protected readonly modelContentType: string = Model.TableHeaderCellModel.ContentType;
        protected readonly viewTagName: string = "TH";

        protected createModelInstance(): Model.TableHeaderCellModel {
            return new Model.TableHeaderCellModel();
        }

        protected applyCustomAttributes(model: Model.TableHeaderCellModel, view: HTMLTableHeaderCellElement): void {
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

            if (model.scope === null) {
                view.removeAttribute("scope");
            } else {
                view.scope = model.scope;
            }

            if (model.abbreviation === null) {
                view.removeAttribute("abbr");
            } else {
                view.abbr = model.abbreviation;
            }
        }

        protected parseCustomAttributes(model: Model.TableHeaderCellModel, view: HTMLTableHeaderCellElement): void {
            if (view.hasAttribute("colspan")) {
                model.columnSpan = view.colSpan;
            }

            if (view.hasAttribute("rowspan")) {
                model.rowSpan = view.rowSpan;
            }

            if (view.hasAttribute("scope")) {
                model.scope = <Model.TableHeaderCellScope>view.scope;
            }

            if (view.hasAttribute("abbr")) {
                model.abbreviation = view.abbr;
            }
        }
    }
}