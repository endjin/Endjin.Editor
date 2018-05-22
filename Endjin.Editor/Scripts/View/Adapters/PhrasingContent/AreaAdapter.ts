/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/AreaModel.ts" />

namespace Endjin.Editor.View {
    export class AreaAdapter extends ViewAdapterBase<HTMLAreaElement, Model.AreaModel> {

        protected readonly adapterDisplayName: string = "area adapter";
        protected readonly modelContentType: string = Model.AreaModel.ContentType;
        protected readonly viewTagName: string = "AREA";

        protected createModelInstance(): Model.AreaModel {
            return new Model.AreaModel();
        }
        protected applyCustomAttributes(model: Model.AreaModel, view: HTMLAreaElement): void {
            view.alt = model.alternateText;
            view.href = model.href;
            view.shape = model.shape;
            if (model.rel.length > 0) {
                view.rel = model.rel.join(" ");
            } else {
                view.removeAttribute("rel");
            }
            view.target = model.target;
        }

        protected parseCustomAttributes(model: Model.AreaModel, view: HTMLAreaElement): void {
            model.alternateText = view.alt;
            // We want the raw HREF
            model.href = view.getAttribute("href") || "";
            model.shape = <Model.AreaShape>view.shape;
            if (view.hasAttribute("rel")) {
                model.rel.push(...view.rel.split(" "));
            }
            model.target = view.target;
        }
    }
}