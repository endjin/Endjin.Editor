/// <reference path="InputAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/InputFileModel.ts" />

namespace Endjin.Editor.View {
    export class InputFileAdapter extends InputAdapterBase<Model.InputFileModel> {
        protected readonly modelContentType: string = Model.InputFileModel.ContentType;
        protected readonly adapterDisplayName: string = "input file";
        protected readonly inputElementType: string = "file";

        protected createModelInstance(): Model.InputFileModel {
            return new Model.InputFileModel();
        }

        protected applyCustomAttributes(model: Model.InputFileModel, view: HTMLInputElement): void {
            super.applyCustomAttributes(model, view);
            view.accept = model.accept.join(",");
        }

        protected parseCustomAttributes(model: Model.InputFileModel, view: HTMLInputElement): void {
            super.parseCustomAttributes(model, view);
            model.accept.push(...view.accept.split(","));
        }
    }
}