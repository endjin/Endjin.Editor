/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />
/// <reference path="../UnclassifiedContent/TrackModel.ts" />
/// <reference path="../UnclassifiedContent/SourceModel.ts" />
/// <reference path="VideoModel.ts" />

namespace Endjin.Editor.Model {
    export class AudioModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.EmbeddedContent}.audio`;

        private _volume: number = 1.0;

        autoplay: boolean;
        showControls: boolean;
        loop: boolean;
        isMuted: boolean;
        source: string;

        get volume(): number {
            return this._volume;
        }

        set volume(value: number) {
            this._volume = Math.min(Math.max(0, value), 1);
        }

        get contentType(): string {
            return AudioModel.ContentType;
        }

        get isInteractive(): boolean {
            return this.showControls;
        }

        readonly acceptsTypes: string[] = [SourceModel.ContentType, TrackModel.ContentType, CommonModelTypes.PhrasingContent];

        canAccept(index: number, child: IModel): boolean {
            if (child.anyInTree((c) => c.contentType === AudioModel.ContentType || c.contentType === VideoModel.ContentType)) {
                return false;
            }

            return super.canAccept(index, child);
        }
    }
}