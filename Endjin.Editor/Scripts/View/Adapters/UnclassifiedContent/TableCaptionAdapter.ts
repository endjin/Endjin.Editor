/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/UnclassifiedContent/TableCaptionModel.ts" />

namespace Endjin.Editor.View {
    export class TableCaptionAdapter extends ViewAdapterBase<HTMLTableCaptionElement, Model.TableCaptionModel> {

        protected readonly adapterDisplayName: string = "table caption adapter";
        protected readonly modelContentType: string = Model.TableCaptionModel.ContentType;
        protected readonly viewTagName: string = "CAPTION";

        protected createModelInstance(): Model.TableCaptionModel {
            return new Model.TableCaptionModel();
        }
    }
}