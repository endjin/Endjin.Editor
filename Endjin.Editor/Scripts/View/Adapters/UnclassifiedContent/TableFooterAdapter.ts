/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/UnclassifiedContent/TableFooterModel.ts" />

namespace Endjin.Editor.View {
    export class TableFooterAdapter extends ViewAdapterBase<HTMLTableSectionElement, Model.TableFooterModel> {

        protected readonly adapterDisplayName: string = "table footer adapter";
        protected readonly modelContentType: string = Model.TableFooterModel.ContentType;
        protected readonly viewTagName: string = "TFOOT";

        protected createModelInstance(): Model.TableFooterModel {
            return new Model.TableFooterModel();
        }
    }
}