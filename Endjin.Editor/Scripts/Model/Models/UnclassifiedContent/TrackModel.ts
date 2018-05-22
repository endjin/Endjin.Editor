/// <reference path="../EmptyContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class TrackModel extends EmptyContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.UnclassifiedContent}.track`;

        get contentType(): string {
            return TrackModel.ContentType;
        }
    }
}