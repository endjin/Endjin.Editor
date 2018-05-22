/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/TimeModel.ts" />

namespace Endjin.Editor.View {
    export class TimeAdapter extends ViewAdapterBase<HTMLTimeElement, Model.TimeModel> {

        protected readonly adapterDisplayName: string = "time adapter";
        protected readonly modelContentType: string = Model.TimeModel.ContentType;
        protected readonly viewTagName: string = "TIME";

        protected createModelInstance(): Model.TimeModel {
            return new Model.TimeModel();
        }
        protected applyCustomAttributes(model: Model.TimeModel, view: HTMLTimeElement): void {
            view.dateTime = model.dateTime;
        }

        protected parseCustomAttributes(model: Model.TimeModel, view: HTMLTimeElement): void {
            model.dateTime = view.dateTime;
        }
    }
}