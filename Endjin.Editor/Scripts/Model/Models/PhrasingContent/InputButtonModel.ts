/// <reference path='InputModelBase.ts' />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class InputButtonModel extends InputModelBase {
        static readonly ContentType: string = `${CommonModelTypes.PhrasingContent}.input.button`;

        get contentType(): string {
            return InputButtonModel.ContentType;
        }
    }
}