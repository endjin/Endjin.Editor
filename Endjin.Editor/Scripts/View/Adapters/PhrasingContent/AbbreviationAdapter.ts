/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/AbbrevationModel.ts" />

namespace Endjin.Editor.View {
    export class AbbreviationAdapter extends ViewAdapterBase<HTMLElement, Model.AbbreviationModel> {

        protected readonly adapterDisplayName: string = "abbreviation adapter";
        protected readonly modelContentType: string = Model.AbbreviationModel.ContentType;
        protected readonly viewTagName: string = "ABBR";

        protected createModelInstance(): Model.AbbreviationModel {
            return new Model.AbbreviationModel();
        }
    }
}