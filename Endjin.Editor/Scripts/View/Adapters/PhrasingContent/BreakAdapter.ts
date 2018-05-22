/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/BreakModel.ts" />

namespace Endjin.Editor.View {
    export class BreakAdapter extends ViewAdapterBase<HTMLBRElement, Model.BreakModel> {
        protected readonly adapterDisplayName: string = "break adapter";
        protected readonly modelContentType: string = Model.BreakModel.ContentType;
        protected readonly viewTagName: string = "BR";

        protected createModelInstance(): Model.BreakModel {
            return new Model.BreakModel();
        }
    }
}