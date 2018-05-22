/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/FlowContent/TableModel.ts" />

namespace Endjin.Editor.View {
    export class TableAdapter extends ViewAdapterBase<HTMLTableElement, Model.TableModel> {

        protected readonly adapterDisplayName: string = "table adapter";
        protected readonly modelContentType: string = Model.TableModel.ContentType;
        protected readonly viewTagName: string = "TABLE";

        protected createModelInstance(): Model.TableModel {
            return new Model.TableModel();
        }
    }
}