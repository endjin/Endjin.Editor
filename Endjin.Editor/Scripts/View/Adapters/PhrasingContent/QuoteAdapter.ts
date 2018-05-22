/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/QuoteModel.ts" />

namespace Endjin.Editor.View {
    export class QuoteAdapter extends ViewAdapterBase<HTMLQuoteElement, Model.QuoteModel> {

        protected readonly adapterDisplayName: string = "quote adapter";
        protected readonly modelContentType: string = Model.QuoteModel.ContentType;
        protected readonly viewTagName: string = "Q";

        protected createModelInstance(): Model.QuoteModel {
            return new Model.QuoteModel();
        }
        protected applyCustomAttributes(model: Model.QuoteModel, view: HTMLQuoteElement): void {
            if (model.citeUri === null) {
                view.removeAttribute("cite");
            } else {
                view.cite = model.citeUri;
            }
        }

        protected parseCustomAttributes(model: Model.QuoteModel, view: HTMLQuoteElement): void {
            if (view.hasAttribute("cite")) {
                model.citeUri = view.cite;
            }
        }
    }
}