/// <reference path="../EmptyContentModelBase.ts" />
/// <reference path="../CommonModelTypes.ts" />

namespace Endjin.Editor.Model {
    export class GoogleMapsModel extends ChildContentModelBase {
        static readonly ContentType: string = `${CommonModelTypes.EmbeddedContent}.googlemaps`;

        embedCode: string = `<iframe width="100%" height="430" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps/ms?msa=0&msid=201595218173101483670.0004d79a6535b6f36505c&ie=UTF8&t=m&ll=51.500462,-0.082226&spn=0.004675,0.00912&z=16&output=embed"></iframe>`;
        height: string = "15rem";
        width: string = "100%";

        get contentType(): string {
            return GoogleMapsModel.ContentType;
        }

        readonly isInteractive: boolean = true;

        readonly acceptsTypes: string[] = [CommonModelTypes.FlowContent];
    }
}