/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class SpanModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.PhrasingContent}.span`;

        get contentType(): string {
            return SpanModel.ContentType;
        }

        readonly acceptsTypes: string[] = [CommonModelTypes.PhrasingContent];
    }
}