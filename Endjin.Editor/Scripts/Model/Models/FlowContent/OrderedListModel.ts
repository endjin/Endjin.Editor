/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />
/// <reference path="../UnclassifiedContent/ListItemModel.ts" />
/// <reference path="../UnclassifiedContent/TextModel.ts" />

namespace Endjin.Editor.Model {
    export enum NumberingType {
        Numbers = "1",
        LowerCaseLetters = "a",
        UpperCaseLetters = "A",
        LowerCaseRomanNumerals = "i",
        UpperCaseRomanNumerals = "I"
    }

    export class OrderedListModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.FlowContent}.orderedlist`;

        start: number | null = null;
        type: NumberingType | null = null;

        get contentType(): string {
            return OrderedListModel.ContentType;
        }

        readonly acceptsTypes: string[] = [ListItemModel.ContentType, TextModel.ContentType];
    }
}