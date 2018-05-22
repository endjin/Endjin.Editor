/// <reference path="../../ViewAdapterBase.ts" />
/// <reference path="../../../Model/Models/EmbeddedContent/VideoModel.ts" />

namespace Endjin.Editor.View {
    export class VideoAdapter extends ViewAdapterBase<HTMLVideoElement, Model.VideoModel> {

        protected readonly adapterDisplayName: string = "video adapter";
        protected readonly modelContentType: string = Model.VideoModel.ContentType;
        protected readonly viewTagName: string = "VIDEO";

        protected createModelInstance(): Model.VideoModel {
            return new Model.VideoModel();
        }
        protected applyCustomAttributes(model: Model.VideoModel, view: HTMLVideoElement): void {
            view.autoplay = model.autoplay;
            view.controls = model.showControls;
            view.loop = model.loop;
            view.muted = model.isMuted;
            view.src = model.source;
            view.poster = model.poster;
            if (model.width !== null) {
                view.width = model.width;
            }

            if (model.height !== null) {
                view.height = model.height;
            }
        }

        protected parseCustomAttributes(model: Model.VideoModel, view: HTMLVideoElement): void {
            model.autoplay = view.autoplay;
            model.showControls = view.controls;
            model.loop = view.loop;
            model.isMuted = view.muted;
            model.source = view.src;
            model.poster = view.poster;

            if (view.hasAttribute("height")) {
                model.height = view.height;
            }
            if (view.hasAttribute("width")) {
                model.width = view.width;
            }
        }
    }
}