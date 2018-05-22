/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/MeterModel.ts" />

namespace Endjin.Editor.View {
    export class MeterAdapter extends ViewAdapterBase<HTMLMeterElement, Model.MeterModel> {

        protected readonly adapterDisplayName: string = "meter adapter";
        protected readonly modelContentType: string = Model.MeterModel.ContentType;
        protected readonly viewTagName: string = "METER";

        protected createModelInstance(): Model.MeterModel {
            return new Model.MeterModel();
        }
        protected applyCustomAttributes(model: Model.MeterModel, view: HTMLMeterElement): void {
            view.min = model.minimum;
            view.max = model.maximum;
            view.low = model.low;
            view.high = model.high;
            view.optimum = model.optimum;
        }

        protected parseCustomAttributes(model: Model.MeterModel, view: HTMLMeterElement): void {
            model.minimum = view.min;
            model.maximum = view.max;
            model.low = view.low;
            model.high = view.high;
            model.optimum = view.optimum;
        }
    }
}