/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/OutputModel.ts" />

namespace Endjin.Editor.View {
    export class OutputAdapter extends ViewAdapterBase<HTMLOutputElement, Model.OutputModel> {

        protected readonly adapterDisplayName: string = "output adapter";
        protected readonly modelContentType: string = Model.OutputModel.ContentType;
        protected readonly viewTagName: string = "OUTPUT";

        protected createModelInstance(): Model.OutputModel {
            return new Model.OutputModel();
        }
        protected applyCustomAttributes(model: Model.OutputModel, view: HTMLOutputElement): void {
            view.name = model.name;
        }

        protected parseCustomAttributes(model: Model.OutputModel, view: HTMLOutputElement): void {
            model.name = view.name;
        }
    }
}