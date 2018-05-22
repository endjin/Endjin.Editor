/// <reference path='InputModelBase.ts' />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class InputDateTimeLocalModel extends InputModelBase {
        static readonly ContentType: string = `${CommonModelTypes.PhrasingContent}.input.datetimelocal`;

        get contentType(): string {
            return InputDateTimeLocalModel.ContentType;
        }
    }
}