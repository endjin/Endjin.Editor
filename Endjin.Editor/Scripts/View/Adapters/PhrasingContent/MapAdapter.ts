/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/MapModel.ts" />

namespace Endjin.Editor.View {
    export class MapAdapter extends ViewAdapterBase<HTMLMapElement, Model.MapModel> {

        protected readonly adapterDisplayName: string = "map adapter";
        protected readonly modelContentType: string = Model.MapModel.ContentType;
        protected readonly viewTagName: string = "MAP";

        protected createModelInstance(): Model.MapModel {
            return new Model.MapModel();
        }
        protected applyCustomAttributes(model: Model.MapModel, view: HTMLMapElement): void {
            view.name = model.name;
        }

        protected parseCustomAttributes(model: Model.MapModel, view: HTMLMapElement): void {
            model.name = view.name;
        }
    }
}