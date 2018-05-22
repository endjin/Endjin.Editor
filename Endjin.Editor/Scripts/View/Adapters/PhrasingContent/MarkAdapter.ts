/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/MarkModel.ts" />

namespace Endjin.Editor.View {
    export class MarkAdapter extends ViewAdapterBase<HTMLElement, Model.MarkModel> {

        protected readonly adapterDisplayName: string = "mark adapter";
        protected readonly modelContentType: string = Model.MarkModel.ContentType;
        protected readonly viewTagName: string = "MARK";

        protected createModelInstance(): Model.MarkModel {
            return new Model.MarkModel();
        }
    }
}