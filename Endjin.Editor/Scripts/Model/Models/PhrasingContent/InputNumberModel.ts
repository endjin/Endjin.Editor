/// <reference path='InputModelBase.ts' />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class InputNumberModel extends InputModelBase {
        static readonly ContentType: string = `${CommonModelTypes.PhrasingContent}.input.number`;

        set valueAsInteger(value: number) {
            this.value = value.toFixed(0);
        }

        get valueAsInteger(): number {
            return parseInt(this.value);
        }

        get valueAsFloat(): number {
            return parseFloat(this.value);
        }

        set valueAsFloat(value: number) {
            this.value = value.toString(10);
        }

        get contentType(): string {
            return InputNumberModel.ContentType;
        }
    }
}