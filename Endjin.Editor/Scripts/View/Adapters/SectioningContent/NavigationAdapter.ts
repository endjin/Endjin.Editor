/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/SectioningContent/NavigationModel.ts" />

namespace Endjin.Editor.View {
    export class NavigationAdapter extends ViewAdapterBase<HTMLElement, Model.NavigationModel> {

        protected readonly adapterDisplayName: string = "navigation adapter";
        protected readonly modelContentType: string = Model.NavigationModel.ContentType;
        protected readonly viewTagName: string = "NAV";

        protected createModelInstance(): Model.NavigationModel {
            return new Model.NavigationModel();
        }
    }
}