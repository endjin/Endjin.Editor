/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/EmbeddedContent/ImageModel.ts" />

namespace Endjin.Editor.View {

    export class ImageAdapter extends ViewAdapterBase<HTMLImageElement, Model.ImageModel> {

        protected readonly adapterDisplayName: string = "image adapter";
        protected readonly modelContentType: string = Model.ImageModel.ContentType;
        protected readonly viewTagName: string = "IMAGE";

        protected createModelInstance(): Model.ImageModel {
            return new Model.ImageModel();
        }
        protected applyCustomAttributes(model: Model.ImageModel, view: HTMLImageElement): void {
            view.src = model.source;

            view.alt = model.alternateText;

            if (model.sizes.length === 0) {
                view.removeAttribute("sizes");
            } else {
                view.sizes = model.sizes.join(",");
            }

            if (model.sourceSet.length === 0) {
                view.removeAttribute("srcset");
            } else {
                view.srcset = model.sourceSet.join(",");
            }

        }

        protected parseCustomAttributes(model: Model.ImageModel, view: HTMLImageElement): void {
            model.alternateText = view.alt;
            model.source = view.src;

            if (view.sizes) {
                model.sizes.push(...view.sizes.split(","));
            }

            if (view.srcset) {
                model.sizes.push(...view.srcset.split(","));
            }
        }
    }
}