/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/AnchorModel.ts" />

namespace Endjin.Editor.View {
    export class AnchorAdapter extends ViewAdapterBase<HTMLLinkElement, Model.AnchorModel> {

        protected readonly adapterDisplayName: string = "anchor adapter";
        protected readonly modelContentType: string = Model.AnchorModel.ContentType;
        protected readonly viewTagName: string = "A";

        protected createModelInstance(): Model.AnchorModel {
            return new Model.AnchorModel();
        }

        protected applyCustomAttributes(model: Model.AnchorModel, view: HTMLLinkElement): void {
            view.href = model.href;
            if (model.rel.length === 0) {
                view.removeAttribute("rel");
            } else {
                view.rel = model.rel.join(" ");
            }

            if (model.target === null) {
                view.removeAttribute("target");
            } else {
                view.target = model.target;
            }
        }

        protected parseCustomAttributes(model: Model.AnchorModel, view: HTMLLinkElement): void {
            // We want the raw HREF
            model.href = view.getAttribute("href") || "";
            if (view.hasAttribute("rel")) {
                model.rel.push(...view.rel.split(" "));
            }

            if (view.hasAttribute("target")) {
                model.target = view.target;
            }
        }
    }
}