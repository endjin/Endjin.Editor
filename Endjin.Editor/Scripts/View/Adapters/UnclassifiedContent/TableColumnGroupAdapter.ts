/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/UnclassifiedContent/TableColumnGroupModel.ts" />

namespace Endjin.Editor.View {
    export class TableColumnGroupAdapter extends ViewAdapterBase<HTMLTableColElement, Model.TableColumnGroupModel> {
        protected readonly adapterDisplayName: string = "table column group adapter";
        protected readonly modelContentType: string = Model.TableColumnGroupModel.ContentType;
        protected readonly viewTagName: string = "COLGROUP";

        protected createModelInstance(): Model.TableColumnGroupModel {
            return new Model.TableColumnGroupModel();
        }

        protected applyCustomAttributes(model: Model.TableColumnGroupModel, view: HTMLTableColElement): void {
            if (model.span === null) {
                view.removeAttribute("span");
            } else {
                view.span = model.span;
            }
        }

        protected parseCustomAttributes(model: Model.TableColumnGroupModel, view: HTMLTableColElement): void {
            if (view.hasAttribute("span")) {
                model.span = view.span;
            }
        }
    }
}