/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/UnclassifiedContent/SourceModel.ts" />

namespace Endjin.Editor.View {
    export class SourceAdapter extends ViewAdapterBase<HTMLSourceElement, Model.SourceModel> {
        protected readonly adapterDisplayName: string = "source adapter";
        protected readonly modelContentType: string = Model.SourceModel.ContentType;
        protected readonly viewTagName: string = "SOURCE";

        protected createModelInstance(): Model.SourceModel {
            return new Model.SourceModel();
        }

        protected applyCustomAttributes(model: Model.SourceModel, view: HTMLSourceElement): void {
            view.type = model.type;
            if (model.sizes.length === 0) {
                view.removeAttribute("sizes");
            } else {
                view.sizes = model.sizes.join(",");
            }

            view.src = model.source;

            if (model.sourceSet.length === 0) {
                view.removeAttribute("srcset");
            } else {
                view.srcset = model.sourceSet.join(",");
            }
        }

        protected parseCustomAttributes(model: Model.SourceModel, view: HTMLSourceElement): void {
            model.source = view.src;
            if (view.hasAttribute("srcset")) {
                model.sourceSet.push(...view.srcset.split(","));
            }
            if (view.hasAttribute("sizes")) {
                model.sizes.push(...view.sizes.split(","));
            }
        }
    }
}