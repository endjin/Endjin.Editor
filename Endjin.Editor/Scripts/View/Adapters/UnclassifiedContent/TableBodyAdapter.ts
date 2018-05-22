/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/UnclassifiedContent/TableBodyModel.ts" />

namespace Endjin.Editor.View {
    export class TableBodyAdapter extends ViewAdapterBase<HTMLTableSectionElement, Model.TableBodyModel> {

        protected readonly adapterDisplayName: string = "table body adapter";
        protected readonly modelContentType: string = Model.TableBodyModel.ContentType;
        protected readonly viewTagName: string = "TBODY";

        protected createModelInstance(): Model.TableBodyModel {
            return new Model.TableBodyModel();
        }
    }
}