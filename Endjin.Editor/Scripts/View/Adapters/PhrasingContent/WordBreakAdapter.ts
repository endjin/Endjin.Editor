/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/WordBreakModel.ts" />

namespace Endjin.Editor.View {
    export class WordBreakAdapter extends ViewAdapterBase<HTMLElement, Model.WordBreakModel> {
        protected readonly adapterDisplayName: string = "word break adapter";
        protected readonly modelContentType: string = Model.WordBreakModel.ContentType;
        protected readonly viewTagName: string = "WBR";

        protected createModelInstance(): Model.WordBreakModel {
            return new Model.WordBreakModel();
        }
    }
}