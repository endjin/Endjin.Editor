/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/EmbeddedContent/InlineFrameModel.ts" />

namespace Endjin.Editor.View {
    export class InlineFrameAdapter extends ViewAdapterBase<HTMLIFrameElement, Model.InlineFrameModel> {

        protected readonly adapterDisplayName: string = "inline frame adapter";
        protected readonly modelContentType: string = Model.InlineFrameModel.ContentType;
        protected readonly viewTagName: string = "IFRAME";

        protected createModelInstance(): Model.InlineFrameModel {
            return new Model.InlineFrameModel();
        }
        protected applyCustomAttributes(model: Model.InlineFrameModel, view: HTMLIFrameElement): void {
            view.allowFullscreen = model.allowFullscreen;
            view.allowPaymentRequest = model.allowPaymentRequest;
            if (model.height !== null) {
                view.height = `${model.height}px`;
            } else {
                view.removeAttribute("height");
            }
            if (model.width !== null) {
                view.width = `${model.width}px`;
            } else {
                view.removeAttribute("width");
            }
            view.name = model.name;
            view.src = model.source;
            if (model.sourceDocument !== null) {
                view.srcdoc = model.sourceDocument;
            } else {
                view.removeAttribute("srcdoc");
            }
        }

        protected parseCustomAttributes(model: Model.InlineFrameModel, view: HTMLIFrameElement): void {
            model.allowFullscreen = view.allowFullscreen;
            model.allowPaymentRequest = view.allowPaymentRequest;
            if (view.hasAttribute("height")) {
                model.height = parseFloat(view.height.substr(0, view.height.length - 2));
            }
            if (view.hasAttribute("width")) {
                model.width = parseFloat(view.width.substr(0, view.width.length - 2));
            }
            model.name = view.name;
            model.source = view.src;
            if (view.hasAttribute("srcdoc")) {
                model.sourceDocument = view.srcdoc;
            }
        }
    }
}