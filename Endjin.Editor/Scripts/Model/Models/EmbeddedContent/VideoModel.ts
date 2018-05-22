/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />
/// <reference path="../UnclassifiedContent/TrackModel.ts" />
/// <reference path="../UnclassifiedContent/SourceModel.ts" />
/// <reference path="AudioModel.ts" />

namespace Endjin.Editor.Model {
    export class VideoModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.EmbeddedContent}.video`;

        autoplay: boolean;
        showControls: boolean;
        loop: boolean;
        isMuted: boolean;
        source: string;
        poster: string;
        width: number | null;
        height: number | null;

        get contentType(): string {
            return VideoModel.ContentType;
        }

        readonly acceptsTypes: string[] = [SourceModel.ContentType, TrackModel.ContentType, CommonModelTypes.PhrasingContent];

        get isInteractive(): boolean {
            return this.showControls;
        }

        canAccept(index: number, child: IModel): boolean {
            if (child.anyInTree((c) => c.contentType === AudioModel.ContentType || c.contentType === VideoModel.ContentType)) {
                return false;
            }

            return super.canAccept(index, child);
        }
    }
}