/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class CiteModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.PhrasingContent}.cite`;

        get contentType(): string {
            return CiteModel.ContentType;
        }

        readonly acceptsTypes: string[] = [CommonModelTypes.PhrasingContent];
    }
}