/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/UnclassifiedContent/TableColumnModel.ts" />

namespace Endjin.Editor.View {
    export class TableColumnAdapter extends ViewAdapterBase<HTMLTableColElement, Model.TableColumnModel> {
        protected readonly adapterDisplayName: string = "table column adapter";
        protected readonly modelContentType: string = Model.TableColumnModel.ContentType;
        protected readonly viewTagName: string = "COL";

        protected createModelInstance(): Model.TableColumnModel {
            return new Model.TableColumnModel();
        }

        protected applyCustomAttributes(model: Model.TableColumnModel, view: HTMLTableColElement): void {
            if (model.span === null) {
                view.removeAttribute("span");
            } else {
                view.span = model.span;
            }
        }

        protected parseCustomAttributes(model: Model.TableColumnModel, view: HTMLTableColElement): void {
            if (view.hasAttribute("span")) {
                model.span = view.span;
            }
        }
    }
}