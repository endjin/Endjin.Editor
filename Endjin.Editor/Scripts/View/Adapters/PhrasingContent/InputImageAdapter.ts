/// <reference path="InputAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/InputImageModel.ts" />

namespace Endjin.Editor.View {
    export class InputImageAdapter extends InputAdapterBase<Model.InputImageModel> {
        protected readonly modelContentType: string = Model.InputImageModel.ContentType;
        protected readonly adapterDisplayName: string = "input image";
        protected readonly inputElementType: string = "image";

        protected createModelInstance(): Model.InputImageModel {
            return new Model.InputImageModel();
        }

        protected applyCustomAttributes(model: Model.InputImageModel, view: HTMLInputElement): void {
            super.applyCustomAttributes(model, view);
            view.src = model.sourceUri;
            view.alt = model.alternateText;
        }

        protected parseCustomAttributes(model: Model.InputImageModel, view: HTMLInputElement): void {
            super.parseCustomAttributes(model, view);
            model.sourceUri = view.src;
            model.alternateText = view.alt;
        }
    }
}