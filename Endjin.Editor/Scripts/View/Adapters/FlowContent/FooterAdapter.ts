/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/FlowContent/FooterModel.ts" />

namespace Endjin.Editor.View {
    export class FooterAdapter extends ViewAdapterBase<HTMLElement, Model.FooterModel> {

        protected readonly adapterDisplayName: string = "footer adapter";
        protected readonly modelContentType: string = Model.FooterModel.ContentType;
        protected readonly viewTagName: string = "FOOTER";

        protected createModelInstance(): Model.FooterModel {
            return new Model.FooterModel();
        }
    }
}