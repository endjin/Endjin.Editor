/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />
/// <reference path="../UnclassifiedContent/LegendModel.ts" />

namespace Endjin.Editor.Model {
    export class FieldSetModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.FlowContent}.fieldset`;

        isDisabled: boolean | null = null;
        name: string | null = null;

        get contentType(): string {
            return FieldSetModel.ContentType;
        }

        readonly acceptsTypes: string[] = [CommonModelTypes.FlowContent, LegendModel.ContentType];

        canAccept(index: number, child: IModel): boolean {
            if (child.contentType === LegendModel.ContentType) {
                if (this.children.length === 0) {
                    return true;
                }

                if (index > 0) {
                    return false;
                }

                if (this.children.length > 0 && this.children[0].contentType === LegendModel.ContentType) {
                    return false;
                }
            }

            return super.canAccept(index, child);
        }
    }
}