﻿/// <reference path='InputModelBase.ts' />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class InputRadioModel extends InputModelBase {
        static readonly ContentType: string = `${CommonModelTypes.PhrasingContent}.input.radio`;

        isChecked: boolean = false;

        get value(): string {
            return this.isChecked.toString();
        } 

        set value(value: string) {
            this.isChecked = value.toLowerCase() === "true";
        }

        get contentType(): string {
            return InputRadioModel.ContentType;
        }
    }
}