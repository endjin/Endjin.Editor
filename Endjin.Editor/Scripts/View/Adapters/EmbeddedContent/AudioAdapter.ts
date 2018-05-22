/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/EmbeddedContent/AudioModel.ts" />

namespace Endjin.Editor.View {
    export class AudioAdapter extends ViewAdapterBase<HTMLAudioElement, Model.AudioModel> {

        protected readonly adapterDisplayName: string = "audio adapter";
        protected readonly modelContentType: string = Model.AudioModel.ContentType;
        protected readonly viewTagName: string = "AUDIO";

        protected createModelInstance(): Model.AudioModel {
            return new Model.AudioModel();
        }
        protected applyCustomAttributes(model: Model.AudioModel, view: HTMLAudioElement): void {
            view.autoplay = model.autoplay;
            view.controls = model.showControls;
            view.loop = model.loop;
            view.muted = model.isMuted;
            view.src = model.source;
        }

        protected parseCustomAttributes(model: Model.AudioModel, view: HTMLAudioElement): void {
            model.autoplay = view.autoplay;
            model.showControls = view.controls;
            model.loop = view.loop;
            model.isMuted = view.muted;
            model.source = view.src;
        } 
    }
}