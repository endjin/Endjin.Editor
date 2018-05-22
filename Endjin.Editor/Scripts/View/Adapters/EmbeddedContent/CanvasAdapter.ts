/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/EmbeddedContent/CanvasModel.ts" />

namespace Endjin.Editor.View {
    export class CanvasAdapter extends ViewAdapterBase<HTMLCanvasElement, Model.CanvasModel> {

        protected readonly adapterDisplayName: string = "canvas adapter";
        protected readonly modelContentType: string = Model.CanvasModel.ContentType;
        protected readonly viewTagName: string = "CANVAS";

        protected createModelInstance(): Model.CanvasModel {
            return new Model.CanvasModel();
        }
        protected applyCustomAttributes(model: Model.CanvasModel, view: HTMLCanvasElement): void {
            view.height = model.height;
            view.width = model.width;
        }

        protected parseCustomAttributes(model: Model.CanvasModel, view: HTMLCanvasElement): void {
            model.height = view.height;
            model.width = view.width;
        }
    }
}