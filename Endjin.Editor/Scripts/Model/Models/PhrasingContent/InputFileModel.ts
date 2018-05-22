/// <reference path='InputModelBase.ts' />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class InputFileModel extends InputModelBase {
        static readonly ContentType: string = `${CommonModelTypes.PhrasingContent}.input.file`;

        accept: Array<string> = [];

        get contentType(): string {
            return InputFileModel.ContentType;
        }
    }
}