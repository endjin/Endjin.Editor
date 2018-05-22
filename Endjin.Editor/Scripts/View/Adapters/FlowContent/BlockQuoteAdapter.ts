/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/FlowContent/BlockQuoteModel.ts" />

namespace Endjin.Editor.View {
    export class BlockQuoteAdapter extends ViewAdapterBase<HTMLQuoteElement, Model.BlockQuoteModel> {

        protected readonly adapterDisplayName: string = "block quote adapter";
        protected readonly modelContentType: string = Model.BlockQuoteModel.ContentType;
        protected readonly viewTagName: string = "BLOCKQUOTE";

        protected createModelInstance(): Model.BlockQuoteModel {
            return new Model.BlockQuoteModel();
        }
        protected applyCustomAttributes(model: Model.BlockQuoteModel, view: HTMLQuoteElement): void {
            view.cite = model.cite;
        }

        protected parseCustomAttributes(model: Model.BlockQuoteModel, view: HTMLQuoteElement): void {
            model.cite = view.cite;
        }
    }
}