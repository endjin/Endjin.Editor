/// <reference path="InputAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/InputRangeModel.ts" />

namespace Endjin.Editor.View {
    export class InputRangeAdapter extends InputAdapterBase<Model.InputRangeModel> {
        protected readonly modelContentType: string = Model.InputRangeModel.ContentType;
        protected readonly adapterDisplayName: string = "input range";
        protected readonly inputElementType: string = "range";

        protected createModelInstance(): Model.InputRangeModel {
            return new Model.InputRangeModel();
        }

        protected applyCustomAttributes(model: Model.InputRangeModel, view: HTMLInputElement): void {
            super.applyCustomAttributes(model, view);
            view.step = model.step.toString();
        }

        protected parseCustomAttributes(model: Model.InputRangeModel, view: HTMLInputElement): void {
            super.parseCustomAttributes(model, view);
            model.step = view.step === "any" ? "any" : parseInt(view.step, 10);
        }
    }
}