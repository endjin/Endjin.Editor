/// <reference path="../EmptyContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class BreakModel extends EmptyContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.PhrasingContent}.break`;

        get contentType(): string {
            return BreakModel.ContentType;
        }
    }
}