namespace Endjin.Editor.Model {
    export class CommonModelTypes {
        static readonly FlowContent: string = "application/vnd.endjin.editor.model.flow";
        static readonly PhrasingContent: string = `${CommonModelTypes.FlowContent}.phrasing`;
        static readonly SectioningContent: string = `${CommonModelTypes.FlowContent}.sectioning`;
        static readonly HeadingContent: string = `${CommonModelTypes.FlowContent}.heading`;
        static readonly EmbeddedContent: string = `${CommonModelTypes.PhrasingContent}.embedded`;
        static readonly UnclassifiedContent: string = "application/vnd.endjin.editor.model.unclassified";
    }
}