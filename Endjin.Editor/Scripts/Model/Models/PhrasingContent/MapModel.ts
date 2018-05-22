/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class MapModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.PhrasingContent}.map`;

        name: string = "";

        get contentType(): string {
            return MapModel.ContentType;
        }

        readonly acceptsTypes: string[] = [CommonModelTypes.PhrasingContent];
    }
}