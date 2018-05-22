/// <reference path='InputModelBase.ts' />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class InputSearchModel extends InputModelBase {
        static readonly ContentType: string = `${CommonModelTypes.PhrasingContent}.input.search`;

        get contentType(): string {
            return InputSearchModel.ContentType;
        }
    }
}