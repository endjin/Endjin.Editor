/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class BidirectionalIsolationModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.PhrasingContent}.bidirectionalisolation`;

        get contentType(): string {
            return BidirectionalIsolationModel.ContentType;
        }

        readonly acceptsTypes: string[] = [CommonModelTypes.PhrasingContent];
    }
}