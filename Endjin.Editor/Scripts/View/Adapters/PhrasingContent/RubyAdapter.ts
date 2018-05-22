/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/RubyModel.ts" />

namespace Endjin.Editor.View {
    export class RubyAdapter extends ViewAdapterBase<HTMLElement, Model.RubyModel> {

        protected readonly adapterDisplayName: string = "ruby adapter";
        protected readonly modelContentType: string = Model.RubyModel.ContentType;
        protected readonly viewTagName: string = "RUBY";

        protected createModelInstance(): Model.RubyModel {
            return new Model.RubyModel();
        }
    }
}