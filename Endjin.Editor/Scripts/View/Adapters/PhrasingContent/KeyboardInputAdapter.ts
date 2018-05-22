/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/PhrasingContent/KeyboardInputModel.ts" />

namespace Endjin.Editor.View {
    export class KeyboardInputAdapter extends ViewAdapterBase<HTMLElement, Model.KeyboardInputModel> {

        protected readonly adapterDisplayName: string = "keyboard input adapter";
        protected readonly modelContentType: string = Model.KeyboardInputModel.ContentType;
        protected readonly viewTagName: string = "KBD";

        protected createModelInstance(): Model.KeyboardInputModel {
            return new Model.KeyboardInputModel();
        }
    }
}