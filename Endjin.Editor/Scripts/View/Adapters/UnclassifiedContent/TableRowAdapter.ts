/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/UnclassifiedContent/TableRowModel.ts" />

namespace Endjin.Editor.View {
    export class TableRowAdapter extends ViewAdapterBase<HTMLTableSectionElement, Model.TableRowModel> {

        protected readonly adapterDisplayName: string = "table row adapter";
        protected readonly modelContentType: string = Model.TableRowModel.ContentType;
        protected readonly viewTagName: string = "TR";

        protected createModelInstance(): Model.TableRowModel {
            return new Model.TableRowModel();
        }
    }
}