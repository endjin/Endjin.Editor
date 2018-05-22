/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/UnclassifiedContent/TableHeaderModel.ts" />

namespace Endjin.Editor.View {
    export class TableHeaderAdapter extends ViewAdapterBase<HTMLTableSectionElement, Model.TableHeaderModel> {

        protected readonly adapterDisplayName: string = "table header adapter";
        protected readonly modelContentType: string = Model.TableHeaderModel.ContentType;
        protected readonly viewTagName: string = "THEAD";

        protected createModelInstance(): Model.TableHeaderModel {
            return new Model.TableHeaderModel();
        }
    }
}