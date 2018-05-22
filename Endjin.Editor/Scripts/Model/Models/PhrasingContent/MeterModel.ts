/// <reference path="../ChildContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class MeterModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.PhrasingContent}.meter`;

        get contentType(): string {
            return MeterModel.ContentType;
        }

        value: number;
        minimum: number;
        maximum: number;
        low: number;
        high: number;
        optimum: number;
        

        readonly acceptsTypes: string[] = [CommonModelTypes.PhrasingContent];

        canAccept(index: number, child: IModel): boolean {
            if (child.anyInTree((c) => c.contentType === MeterModel.ContentType)) {
                return false;
            }

            return super.canAccept(index, child);
        }
    }
} 