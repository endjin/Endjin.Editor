declare namespace Endjin.Editor.Model {
    enum TextDirection {
        Auto = "auto",
        LeftToRight = "ltr",
        RightToLeft = "rtl",
    }
}
declare namespace Endjin.Editor.Model {
    interface IModel {
        id: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
        parent: IModel | null;
        readonly isInteractive: boolean;
        isEditable: boolean;
        classList: Array<string>;
        accessKeys: Array<string>;
        textDirection: TextDirection | null;
        isHidden: boolean | null;
        tabIndex: number | null;
        title: string | null;
        readonly childCount: number;
        forEachChild(func: (child: IModel) => void): void;
        anyInTree(func: (child: IModel) => boolean): boolean;
        anyParent(func: (parent: IModel) => boolean, includeSelf?: boolean): boolean;
        getIndex(child: IModel): number;
        getDirectChildIndex(child: IModel): number;
        getChildAtIndex(index: number): IModel;
        acceptChild(index: number, child: IModel): Selection | null;
        canRemoveChildAtIndex(index: number): boolean;
        removeChildAtIndex(index: number): IModel | null;
        canRemoveSelection(selection: Selection): boolean;
        removeSelection(selection: Selection): Array<IModel>;
        canRemoveRange(startIndex: number, endIndex: number): boolean;
        removeRange(startIndex: number, endIndex: number): Array<IModel>;
        canAccept(index: number, child: IModel): boolean;
        canBeAccepted(index: number, parent: IModel): boolean;
    }
}
declare namespace Endjin.Editor.View {
    interface IViewAdapter {
        render(model: Endjin.Editor.Model.IModel, existingView: HTMLElement | null): HTMLElement;
        canParseView(element: HTMLElement): boolean;
        parseView(element: HTMLElement): Model.IModel;
        readonly priority: number;
        viewEngine: ViewEngine;
    }
    function applyGlobalAttributes(model: Model.IModel, view: HTMLElement): void;
    function parseGlobalAttributes(model: Model.IModel, view: HTMLElement): void;
}
declare namespace Endjin.Editor.Model {
    abstract class ContentModelBase implements IModel {
        abstract childCount: number;
        abstract forEachChild(func: (child: IModel) => void): void;
        abstract anyInTree(func: (child: IModel) => boolean): boolean;
        abstract getIndex(child: IModel): number;
        abstract getDirectChildIndex(child: IModel): number;
        abstract getChildAtIndex(index: number): IModel;
        abstract acceptChild(index: number, child: IModel): Selection | null;
        abstract canRemoveChildAtIndex(index: number): boolean;
        abstract removeChildAtIndex(index: number): IModel | null;
        abstract canRemoveSelection(selection: Selection): boolean;
        abstract removeSelection(selection: Selection): IModel[];
        abstract canRemoveRange(startIndex: number, endIndex: number): boolean;
        abstract removeRange(startIndex: number, endIndex: number): IModel[];
        abstract canAccept(index: number, child: IModel): boolean;
        abstract canBeAccepted(index: number, parent: IModel): boolean;
        private static NextId;
        id: string;
        readonly abstract contentType: string;
        readonly abstract acceptsTypes: string[];
        parent: IModel | null;
        isInteractive: boolean;
        isEditable: boolean;
        classList: Array<string>;
        accessKeys: Array<string>;
        textDirection: TextDirection | null;
        isHidden: boolean | null;
        tabIndex: number | null;
        title: string | null;
        anyParent(func: (child: IModel) => boolean, includeSelf?: boolean): boolean;
    }
}
declare namespace Endjin.Editor.Model {
    class CommonModelTypes {
        static readonly FlowContent: string;
        static readonly PhrasingContent: string;
        static readonly SectioningContent: string;
        static readonly HeadingContent: string;
        static readonly EmbeddedContent: string;
        static readonly UnclassifiedContent: string;
    }
}
declare namespace Endjin.Editor.Model {
    abstract class EmptyContentModelBase extends ContentModelBase {
        readonly acceptsTypes: string[];
        readonly childCount: number;
        forEachChild(func: (child: IModel) => void): void;
        anyInTree(func: (child: IModel) => boolean): boolean;
        getIndex(child: IModel): number;
        getDirectChildIndex(child: IModel): number;
        getChildAtIndex(index: number): IModel;
        canAccept(index: number, child: IModel): boolean;
        acceptChild(index: number, child: IModel): Selection | null;
        canRemoveSelection(selection: Selection): boolean;
        removeSelection(selection: Selection): IModel[];
        canRemoveChildAtIndex(index: number): boolean;
        canRemoveRange(startIndex: number, endIndex: number): boolean;
        removeRange(startIndex: number, endIndex: number): Array<IModel>;
        removeChildAtIndex(index: number): IModel | null;
        canBeAccepted(index: number, parent: IModel): boolean;
    }
}
declare namespace Endjin.Editor.Model {
    class TextModel extends EmptyContentModelBase implements IModel {
        textRun: string;
        static readonly ContentType: string;
        readonly acceptsTypes: Array<string>;
        constructor(textRun: string);
        readonly contentType: string;
        canRemoveRange(startIndex: number, endIndex: number): boolean;
        removeRange(startIndex: number, endIndex: number): Array<IModel>;
        canAccept(index: number, child: IModel): boolean;
        acceptChild(index: number, child: IModel): Selection | null;
        canRemoveSelection(selection: Selection): boolean;
        removeSelection(selection: Selection): Array<IModel>;
    }
}
declare namespace Endjin.Editor.View {
    class ViewEngine {
        private editor;
        private modelToViewAdapter;
        private viewToModel;
        private modelToView;
        private viewAdapters;
        private modelToViewEventHandlers;
        constructor(editor: IEditor);
        destroy(): void;
        destroyModels(...models: Model.IModel[]): void;
        addViewEventHandler(handler: IViewEventHandler, model: Model.IModel): void;
        render(model: Model.IModel): Node;
        renderAndAppend(view: Node, model: Model.IModel): void;
        canParse(view: Node): boolean;
        parseChildren(model: Model.IModel, view: HTMLElement): boolean;
        parse(view: Node): Model.IModel;
        findContainingModel(view: Node): Endjin.Editor.Model.IModel | null;
        addViewAdapter(modelType: string, viewAdapter: IViewAdapter): void;
        deleteViewAdapter(modelType: string): boolean;
        getSelection(): Model.Selection | null;
        setSelection(selection: Model.Selection | null): boolean;
        private getViewAdapterForModel(model);
        private getViewForModel(model);
    }
}
declare namespace Endjin.Editor.Model {
    class Document {
        root: IModel;
    }
}
declare namespace Endjin.Editor.Model {
    class Location {
        readonly model: IModel;
        readonly index: number;
        equals(other: Location): boolean;
        isBefore(other: Location): boolean;
        isAfter(other: Location): boolean;
        constructor(model: IModel, index: number);
    }
}
declare namespace Endjin.Editor.Model {
    class Selection {
        readonly selectionScope: IModel;
        readonly selectionStart: Location;
        readonly selectionEnd: Location;
        constructor(selectionScope: IModel, selectionStart: Location, selectionEnd: Location);
        readonly isCollapsed: boolean;
        collapseToStart(): Selection;
        collapseToEnd(): Selection;
        collapseToFirst(): Selection;
        collapseToLast(): Selection;
        normalize(): Selection;
    }
}
declare namespace Endjin.Editor.Model {
    class KeyboardShortcutEngine {
        private editor;
        private bindings;
        private keyState;
        private candidateBindings;
        constructor(editor: IEditor);
        registerKeychord(keychord: Keychord, command: IDocumentCommand): void;
        registerKeypress(keypress: Keypress, command: IDocumentCommand): void;
        dispatchKeyboardShortcut(keypress: Keypress): boolean;
    }
}
declare namespace Endjin.Editor.View {
    abstract class ViewAdapterBase<TView extends HTMLElement, TModel extends Model.IModel> implements IViewAdapter {
        readonly priority: number;
        protected readonly abstract adapterDisplayName: string;
        protected readonly abstract modelContentType: string;
        protected readonly abstract viewTagName: string;
        protected abstract createModelInstance(): TModel;
        protected applyCustomAttributes(model: TModel, view: TView): void;
        protected parseCustomAttributes(model: TModel, view: TView): void;
        viewEngine: ViewEngine;
        render(model: Model.IModel, existingView: HTMLElement | null): HTMLElement;
        canParseView(element: HTMLElement): boolean;
        parseView(element: HTMLElement): Model.IModel;
    }
}
declare namespace Endjin.Editor.Model {
    abstract class ChildContentModelBase extends ContentModelBase {
        protected children: Array<IModel>;
        readonly childCount: number;
        forEachChild(func: (child: IModel) => void): void;
        anyInTree(func: (child: IModel) => boolean): boolean;
        getIndex(child: IModel): number;
        getChildAtIndex(index: number): IModel;
        getDirectChildIndex(model: IModel): number;
        anyParent(func: (child: IModel) => boolean, includeSelf?: boolean): boolean;
        acceptChild(index: number, child: IModel): Selection | null;
        canRemoveChildAtIndex(index: number): boolean;
        canRemoveRange(startIndex: number, endIndex: number): boolean;
        removeRange(startIndex: number, endIndex: number): Array<IModel>;
        removeChildAtIndex(index: number): IModel | null;
        canRemoveSelection(selection: Selection): boolean;
        removeSelection(selection: Selection): Array<IModel>;
        canAccept(index: number, child: IModel): boolean;
        canBeAccepted(index: number, parent: IModel): boolean;
    }
}
declare namespace Endjin.Editor.Model {
    class TrackModel extends EmptyContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
    }
}
declare namespace Endjin.Editor.Model {
    class SourceModel extends EmptyContentModelBase {
        static readonly ContentType: string;
        type: string;
        sizes: Array<string>;
        source: string;
        sourceSet: Array<string>;
        readonly contentType: string;
    }
}
declare namespace Endjin.Editor.Model {
    class VideoModel extends ChildContentModelBase {
        static readonly ContentType: string;
        autoplay: boolean;
        showControls: boolean;
        loop: boolean;
        isMuted: boolean;
        source: string;
        poster: string;
        width: number | null;
        height: number | null;
        readonly contentType: string;
        readonly acceptsTypes: string[];
        readonly isInteractive: boolean;
        canAccept(index: number, child: IModel): boolean;
    }
}
declare namespace Endjin.Editor.Model {
    class AudioModel extends ChildContentModelBase {
        static readonly ContentType: string;
        private _volume;
        autoplay: boolean;
        showControls: boolean;
        loop: boolean;
        isMuted: boolean;
        source: string;
        volume: number;
        readonly contentType: string;
        readonly isInteractive: boolean;
        readonly acceptsTypes: string[];
        canAccept(index: number, child: IModel): boolean;
    }
}
declare namespace Endjin.Editor.View {
    class AudioAdapter extends ViewAdapterBase<HTMLAudioElement, Model.AudioModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.AudioModel;
        protected applyCustomAttributes(model: Model.AudioModel, view: HTMLAudioElement): void;
        protected parseCustomAttributes(model: Model.AudioModel, view: HTMLAudioElement): void;
    }
}
declare namespace Endjin.Editor.Model {
    enum AnchorTarget {
        Self = "_self",
        Blank = "_blank",
        Parent = "_parent",
        Top = "_top",
    }
    class AnchorModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly isInteractive: boolean;
        href: string;
        rel: Array<string>;
        target: AnchorTarget | string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
        canAccept(index: number, child: IModel): boolean;
    }
}
declare namespace Endjin.Editor.Model {
    enum FormAutoComplete {
        Off = "off",
        On = "on",
    }
    enum FormEncodingType {
        FormUrlEncoded = "application/x-www-form-urlencoded",
        MultipartFormData = "multipart/form-data",
        PlainText = "text/plain",
    }
    enum FormSubmitMethod {
        Post = "post",
        Get = "get",
    }
    enum FormTarget {
        Self = "_self",
        Blank = "_blank",
        Parent = "_parent",
        Top = "_top",
    }
    class FormModel extends ChildContentModelBase {
        static readonly ContentType: string;
        acceptCharset: Array<string>;
        actionUri: string;
        autocomplete: FormAutoComplete;
        encodingType: FormEncodingType;
        method: FormSubmitMethod | string;
        noValidation: boolean;
        target: FormTarget | string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
        canAccept(index: number, child: IModel): boolean;
    }
}
declare namespace Endjin.Editor.Model {
    enum ButtonType {
        Submit = "submit",
        Reset = "reset",
        Button = "button",
    }
    class ButtonModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly isInteractive: boolean;
        autofocus: boolean;
        isDisabled: boolean | null;
        formActionUri: string | null;
        formMethod: FormSubmitMethod | string | null;
        formEncodingType: FormEncodingType | null;
        formNoValidation: boolean | null;
        formTarget: FormTarget | string | null;
        buttonType: ButtonType;
        value: string;
        name: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.Model {
    enum AutocompleteOptions {
        Off = "off",
        On = "on",
        Name = "name",
        HonorificPrefix = "honorific-prefix",
        GivenName = "given-name",
        AdditionalName = "additional-name",
        FamilyName = "family-name",
        HonorificSuffix = "honorific-suffix",
        Nickname = "nickname",
        Email = "email",
        Username = "username",
        NewPassword = "new-password",
        CurrentPassword = "current-password",
        OrganizationTitle = "organization-title",
        Organization = "organization",
        StreetAddress = "street-address",
        AddressLine1 = "address-line1",
        AddressLine2 = "address-line2",
        AddressLine3 = "address-line3",
        AddressLevel1 = "address-level1",
        AddressLevel2 = "address-level2",
        AddressLevel3 = "address-level3",
        AddressLevel4 = "address-level4",
        Country = "country",
        CountryName = "country-name",
        PostalCode = "postal-code",
        CCName = "cc-name",
        CCGivenName = "cc-given-name",
        CCAdditionalName = "cc-additional-name",
        CCFamilyName = "cc-family-name",
        CCNumber = "cc-number",
        CCExpiryDate = "cc-expiry",
        CCExpiryMonth = "cc-expiry-month",
        CCExpiryYear = "cc-expiry-year",
        CCCSC = "cc-csc",
        CCType = "cc-type",
        TransactionCurrency = "transaction-currency",
        TransactionAmount = "transaction-amount",
        Language = "language",
        Birthday = "bday",
        BirthdayMonth = "bday-month",
        BirthdayYear = "bday-year",
        Sex = "sex",
        Telephone = "tel",
        TelephoneCountryCode = "tel-country-code",
        TelephoneNational = "tel-national",
        TelephoneAreaCode = "tel-area-code",
        TelephoneLocal = "tel-local",
        TelephoneLocalPrefix = "tel-local-prefix",
        TelephoneLocalSuffix = "tel-local-suffix",
        TelephoneExtension = "tel-extension",
        Url = "url",
        Photo = "photo",
    }
    enum SelectionDirection {
        None = "none",
        Forward = "forward",
        Backward = "backward",
    }
    abstract class InputModelBase extends EmptyContentModelBase {
        value: string;
        autocomplete: AutocompleteOptions;
        isDisabled: boolean;
        autofocus: boolean;
        formActionUri: string | null;
        formMethod: FormSubmitMethod | string | null;
        formEncodingType: FormEncodingType | null;
        formNoValidation: boolean | null;
        formTarget: FormTarget | string | null;
        minimum: string | null;
        maximum: string | null;
        minimumLength: number | null;
        maximumLength: number | null;
        pattern: string | null;
        placeholder: string | null;
        isReadOnly: boolean | null;
        isRequired: boolean | null;
        selectionDirection: SelectionDirection | null;
        selectionStart: number | null;
        selectionEnd: number | null;
        spellCheck: boolean | null;
        readonly isInteractive: boolean;
    }
}
declare namespace Endjin.Editor.Model {
    class InputCheckboxModel extends InputModelBase {
        static readonly ContentType: string;
        isChecked: boolean;
        value: string;
        readonly contentType: string;
    }
}
declare namespace Endjin.Editor.Model {
    class InputRadioModel extends InputModelBase {
        static readonly ContentType: string;
        isChecked: boolean;
        value: string;
        readonly contentType: string;
    }
}
declare namespace Endjin.Editor.Model {
    class InputButtonModel extends InputModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
    }
}
declare namespace Endjin.Editor.Model {
    class CanvasModel extends ChildContentModelBase {
        static readonly ContentType: string;
        height: number;
        width: number;
        readonly contentType: string;
        readonly acceptsTypes: string[];
        canAccept(index: number, child: IModel): boolean;
    }
}
declare namespace Endjin.Editor.View {
    class CanvasAdapter extends ViewAdapterBase<HTMLCanvasElement, Model.CanvasModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.CanvasModel;
        protected applyCustomAttributes(model: Model.CanvasModel, view: HTMLCanvasElement): void;
        protected parseCustomAttributes(model: Model.CanvasModel, view: HTMLCanvasElement): void;
    }
}
declare namespace Endjin.Editor.Model {
    class ImageModel extends EmptyContentModelBase {
        static readonly ContentType: string;
        private _isMap;
        private _useMap;
        alternateText: string;
        sizes: Array<string>;
        source: string;
        sourceSet: Array<string>;
        isMap: boolean;
        useMap: boolean;
        readonly contentType: string;
    }
}
declare namespace Endjin.Editor.View {
    class ImageAdapter extends ViewAdapterBase<HTMLImageElement, Model.ImageModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.ImageModel;
        protected applyCustomAttributes(model: Model.ImageModel, view: HTMLImageElement): void;
        protected parseCustomAttributes(model: Model.ImageModel, view: HTMLImageElement): void;
    }
}
declare namespace Endjin.Editor.Model {
    class InlineFrameModel extends ChildContentModelBase {
        static readonly ContentType: string;
        allowFullscreen: boolean;
        allowPaymentRequest: boolean;
        height: number | null;
        width: number | null;
        name: string;
        source: string;
        sourceDocument: string | null;
        readonly contentType: string;
        readonly isInteractive: boolean;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class InlineFrameAdapter extends ViewAdapterBase<HTMLIFrameElement, Model.InlineFrameModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.InlineFrameModel;
        protected applyCustomAttributes(model: Model.InlineFrameModel, view: HTMLIFrameElement): void;
        protected parseCustomAttributes(model: Model.InlineFrameModel, view: HTMLIFrameElement): void;
    }
}
declare namespace Endjin.Editor.View {
    class VideoAdapter extends ViewAdapterBase<HTMLVideoElement, Model.VideoModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.VideoModel;
        protected applyCustomAttributes(model: Model.VideoModel, view: HTMLVideoElement): void;
        protected parseCustomAttributes(model: Model.VideoModel, view: HTMLVideoElement): void;
    }
}
declare namespace Endjin.Editor.Model {
    class FooterModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
        canAccept(index: number, child: IModel): boolean;
    }
}
declare namespace Endjin.Editor.Model {
    class HeaderModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
        canAccept(index: number, child: IModel): boolean;
    }
}
declare namespace Endjin.Editor.Model {
    class AsideModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.Model {
    class ArticleModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.Model {
    class AddressModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
        canAccept(index: number, child: IModel): boolean;
    }
}
declare namespace Endjin.Editor.View {
    class AddressAdapter extends ViewAdapterBase<HTMLElement, Model.AddressModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.AddressModel;
    }
}
declare namespace Endjin.Editor.Model {
    class BlockQuoteModel extends ChildContentModelBase {
        static readonly ContentType: string;
        cite: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class BlockQuoteAdapter extends ViewAdapterBase<HTMLQuoteElement, Model.BlockQuoteModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.BlockQuoteModel;
        protected applyCustomAttributes(model: Model.BlockQuoteModel, view: HTMLQuoteElement): void;
        protected parseCustomAttributes(model: Model.BlockQuoteModel, view: HTMLQuoteElement): void;
    }
}
declare namespace Endjin.Editor.Model {
    class DescriptionListDefinitionModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.Model {
    class DescriptionListTermModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
        canAccept(index: number, child: IModel): boolean;
    }
}
declare namespace Endjin.Editor.Model {
    class DescriptionListModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class DescriptionListAdapter extends ViewAdapterBase<HTMLDListElement, Model.DescriptionListModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.DescriptionListModel;
    }
}
declare namespace Endjin.Editor.Model {
    class DetailsModel extends ChildContentModelBase {
        static readonly ContentType: string;
        isOpen: boolean;
        readonly contentType: string;
        readonly isInteractive: boolean;
        readonly acceptsTypes: string[];
        canAccept(index: number, child: IModel): boolean;
    }
}
declare namespace Endjin.Editor.View {
    class DetailsAdapter extends ViewAdapterBase<HTMLDetailsElement, Model.DetailsModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.DetailsModel;
        protected applyCustomAttributes(model: Model.DetailsModel, view: HTMLDetailsElement): void;
        protected parseCustomAttributes(model: Model.DetailsModel, view: HTMLDetailsElement): void;
    }
}
declare namespace Endjin.Editor.Model {
    class DivisionModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class DivisionAdapter extends ViewAdapterBase<HTMLDivElement, Model.DivisionModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.DivisionModel;
    }
}
declare namespace Endjin.Editor.Model {
    class LegendModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.Model {
    class FieldSetModel extends ChildContentModelBase {
        static readonly ContentType: string;
        isDisabled: boolean | null;
        name: string | null;
        readonly contentType: string;
        readonly acceptsTypes: string[];
        canAccept(index: number, child: IModel): boolean;
    }
}
declare namespace Endjin.Editor.View {
    class FieldSetAdapter extends ViewAdapterBase<HTMLFieldSetElement, Model.FieldSetModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.FieldSetModel;
        protected applyCustomAttributes(model: Model.FieldSetModel, view: HTMLFieldSetElement): void;
        protected parseCustomAttributes(model: Model.FieldSetModel, view: HTMLFieldSetElement): void;
    }
}
declare namespace Endjin.Editor.Model {
    class FigureCaptionModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
        canBeAccepted(index: number, parent: IModel): boolean;
    }
}
declare namespace Endjin.Editor.Model {
    class FigureModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
        canAccept(index: number, child: IModel): boolean;
    }
}
declare namespace Endjin.Editor.View {
    class FigureAdapter extends ViewAdapterBase<HTMLElement, Model.FigureModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.FigureModel;
    }
}
declare namespace Endjin.Editor.View {
    class FooterAdapter extends ViewAdapterBase<HTMLElement, Model.FooterModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.FooterModel;
    }
}
declare namespace Endjin.Editor.View {
    class FormAdapter extends ViewAdapterBase<HTMLFormElement, Model.FormModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.FormModel;
        protected applyCustomAttributes(model: Model.FormModel, view: HTMLFormElement): void;
        protected parseCustomAttributes(model: Model.FormModel, view: HTMLFormElement): void;
    }
}
declare namespace Endjin.Editor.View {
    class HeaderAdapter extends ViewAdapterBase<HTMLElement, Model.HeaderModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.HeaderModel;
    }
}
declare namespace Endjin.Editor.Model {
    class MainModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class MainAdapter extends ViewAdapterBase<HTMLElement, Model.MainModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.MainModel;
    }
}
declare namespace Endjin.Editor.Model {
    class ListItemModel extends ChildContentModelBase {
        static readonly ContentType: string;
        value: number | null;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.Model {
    enum NumberingType {
        Numbers = "1",
        LowerCaseLetters = "a",
        UpperCaseLetters = "A",
        LowerCaseRomanNumerals = "i",
        UpperCaseRomanNumerals = "I",
    }
    class OrderedListModel extends ChildContentModelBase {
        static readonly ContentType: string;
        start: number | null;
        type: NumberingType | null;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class OrderedListAdapter extends ViewAdapterBase<HTMLOListElement, Model.OrderedListModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.OrderedListModel;
        protected applyCustomAttributes(model: Model.OrderedListModel, view: HTMLOListElement): void;
        protected parseCustomAttributes(model: Model.OrderedListModel, view: HTMLOListElement): void;
    }
}
declare namespace Endjin.Editor.Model {
    class ParagraphModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class ParagraphAdapter extends ViewAdapterBase<HTMLParagraphElement, Model.ParagraphModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.ParagraphModel;
    }
}
declare namespace Endjin.Editor.Model {
    class PreformattedTextModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class PreformattedTextAdapter extends ViewAdapterBase<HTMLPreElement, Model.PreformattedTextModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.PreformattedTextModel;
    }
}
declare namespace Endjin.Editor.Model {
    class TableCaptionModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.Model {
    class TableColumnModel extends EmptyContentModelBase {
        static readonly ContentType: string;
        span: number | null;
        readonly contentType: string;
    }
}
declare namespace Endjin.Editor.Model {
    class TableColumnGroupModel extends ChildContentModelBase {
        static readonly ContentType: string;
        private _span;
        span: number | null;
        readonly contentType: string;
        readonly acceptsTypes: string[];
        canAccept(index: number, child: IModel): boolean;
    }
}
declare namespace Endjin.Editor.Model {
    class TableCellModel extends ChildContentModelBase {
        static readonly ContentType: string;
        columnSpan: number | null;
        rowSpan: number | null;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.Model {
    class TableFooterModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.Model {
    enum TableHeaderCellScope {
        Row = "row",
        Column = "col",
        RowGroup = "rowgroup",
        ColumnGroup = "colgroup",
        Auto = "auto",
    }
    class TableHeaderCellModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        columnSpan: number | null;
        rowSpan: number | null;
        abbreviation: string | null;
        scope: TableHeaderCellScope | null;
        readonly acceptsTypes: string[];
        canAccept(index: number, child: IModel): boolean;
    }
}
declare namespace Endjin.Editor.Model {
    class TableRowModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.Model {
    class TableHeaderModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.Model {
    class TableBodyModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.Model {
    class TableModel extends ChildContentModelBase {
        private static readonly ErrorState;
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
        canAccept(index: number, child: IModel): boolean;
        private updateAcceptanceState(state, child);
    }
}
declare namespace Endjin.Editor.View {
    class TableAdapter extends ViewAdapterBase<HTMLTableElement, Model.TableModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.TableModel;
    }
}
declare namespace Endjin.Editor.Model {
    class UnorderedListModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class UnorderedListAdapter extends ViewAdapterBase<HTMLUListElement, Model.UnorderedListModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.UnorderedListModel;
    }
}
declare namespace Endjin.Editor.Model {
    class HeadingLevel1Model extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class HeadingLevel1Adapter extends ViewAdapterBase<HTMLHeadingElement, Model.HeadingLevel1Model> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.HeadingLevel1Model;
    }
}
declare namespace Endjin.Editor.Model {
    class HeadingLevel2Model extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class HeadingLevel2Adapter extends ViewAdapterBase<HTMLHeadingElement, Model.HeadingLevel2Model> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.HeadingLevel2Model;
    }
}
declare namespace Endjin.Editor.Model {
    class HeadingLevel3Model extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class HeadingLevel3Adapter extends ViewAdapterBase<HTMLHeadingElement, Model.HeadingLevel3Model> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.HeadingLevel3Model;
    }
}
declare namespace Endjin.Editor.Model {
    class HeadingLevel4Model extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class HeadingLevel4Adapter extends ViewAdapterBase<HTMLHeadingElement, Model.HeadingLevel4Model> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.HeadingLevel4Model;
    }
}
declare namespace Endjin.Editor.Model {
    class HeadingLevel5Model extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class HeadingLevel5Adapter extends ViewAdapterBase<HTMLHeadingElement, Model.HeadingLevel5Model> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.HeadingLevel5Model;
    }
}
declare namespace Endjin.Editor.Model {
    class HeadingLevel6Model extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class HeadingLevel6Adapter extends ViewAdapterBase<HTMLHeadingElement, Model.HeadingLevel6Model> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.HeadingLevel6Model;
    }
}
declare namespace Endjin.Editor.Model {
    class AbbreviationModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class AbbreviationAdapter extends ViewAdapterBase<HTMLElement, Model.AbbreviationModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.AbbreviationModel;
    }
}
declare namespace Endjin.Editor.View {
    class AnchorAdapter extends ViewAdapterBase<HTMLLinkElement, Model.AnchorModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.AnchorModel;
        protected applyCustomAttributes(model: Model.AnchorModel, view: HTMLLinkElement): void;
        protected parseCustomAttributes(model: Model.AnchorModel, view: HTMLLinkElement): void;
    }
}
declare namespace Endjin.Editor.Model {
    enum AreaShape {
        Default = "default",
        Rectangle = "rect",
        Circle = "circle",
        Polygon = "poly",
    }
    enum AreaTarget {
        Self = "_self",
        Blank = "_blank",
        Parent = "_parent",
        Top = "_top",
    }
    class AreaModel extends EmptyContentModelBase {
        static readonly ContentType: string;
        alternateText: string;
        href: string;
        shape: AreaShape;
        rel: Array<string>;
        target: AreaTarget | string;
        readonly contentType: string;
        canBeAccepted(index: number, parent: IModel): boolean;
    }
}
declare namespace Endjin.Editor.View {
    class AreaAdapter extends ViewAdapterBase<HTMLAreaElement, Model.AreaModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.AreaModel;
        protected applyCustomAttributes(model: Model.AreaModel, view: HTMLAreaElement): void;
        protected parseCustomAttributes(model: Model.AreaModel, view: HTMLAreaElement): void;
    }
}
declare namespace Endjin.Editor.Model {
    class BidirectionalIsolationModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class BidirectionalIsolationAdapter extends ViewAdapterBase<HTMLElement, Model.BidirectionalIsolationModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.BidirectionalIsolationModel;
    }
}
declare namespace Endjin.Editor.Model {
    class BidirectionalTextOverrideModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class BidirectionalTextOverrideAdapter extends ViewAdapterBase<HTMLElement, Model.BidirectionalTextOverrideModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.BidirectionalTextOverrideModel;
    }
}
declare namespace Endjin.Editor.Model {
    class BreakModel extends EmptyContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
    }
}
declare namespace Endjin.Editor.View {
    class BreakAdapter extends ViewAdapterBase<HTMLBRElement, Model.BreakModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.BreakModel;
    }
}
declare namespace Endjin.Editor.Model {
    class BringToAttentionModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class BringToAttentionAdapter extends ViewAdapterBase<HTMLElement, Model.BringToAttentionModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.BringToAttentionModel;
    }
}
declare namespace Endjin.Editor.View {
    class ButtonAdapter extends ViewAdapterBase<HTMLButtonElement, Model.ButtonModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.ButtonModel;
        protected applyCustomAttributes(model: Model.ButtonModel, view: HTMLButtonElement): void;
        protected parseCustomAttributes(model: Model.ButtonModel, view: HTMLButtonElement): void;
    }
}
declare namespace Endjin.Editor.Model {
    class CiteModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class CiteAdapter extends ViewAdapterBase<HTMLElement, Model.CiteModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.CiteModel;
    }
}
declare namespace Endjin.Editor.Model {
    class CodeModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class CodeAdapter extends ViewAdapterBase<HTMLElement, Model.CodeModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.CodeModel;
    }
}
declare namespace Endjin.Editor.Model {
    class OptionModel extends ChildContentModelBase {
        static readonly ContentType: string;
        isDisabled: boolean | null;
        isSelected: boolean | null;
        label: string | null;
        value: string | null;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.Model {
    class DataListModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class DataListAdapter extends ViewAdapterBase<HTMLDataListElement, Model.DataListModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.DataListModel;
    }
}
declare namespace Endjin.Editor.Model {
    class DataModel extends ChildContentModelBase {
        static readonly ContentType: string;
        value: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class DataAdapter extends ViewAdapterBase<HTMLDataElement, Model.DataModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.DataModel;
        protected applyCustomAttributes(model: Model.DataModel, view: HTMLDataElement): void;
        protected parseCustomAttributes(model: Model.DataModel, view: HTMLDataElement): void;
    }
}
declare namespace Endjin.Editor.Model {
    class DefinitionModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
        canAccept(index: number, child: IModel): boolean;
    }
}
declare namespace Endjin.Editor.View {
    class DefinitionAdapter extends ViewAdapterBase<HTMLElement, Model.DefinitionModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.DefinitionModel;
    }
}
declare namespace Endjin.Editor.Model {
    class DeleteModel extends ChildContentModelBase {
        static readonly ContentType: string;
        citeUri: string | null;
        dateTime: string | null;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class DeleteAdapter extends ViewAdapterBase<HTMLModElement, Model.DeleteModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.DeleteModel;
        protected applyCustomAttributes(model: Model.DeleteModel, view: HTMLModElement): void;
        protected parseCustomAttributes(model: Model.DeleteModel, view: HTMLModElement): void;
    }
}
declare namespace Endjin.Editor.Model {
    class EmphasisModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class EmphasisAdapter extends ViewAdapterBase<HTMLElement, Model.EmphasisModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.EmphasisModel;
    }
}
declare namespace Endjin.Editor.View {
    abstract class InputAdapterBase<TModel extends Model.InputModelBase> extends ViewAdapterBase<HTMLInputElement, TModel> {
        protected readonly abstract inputElementType: string;
        protected readonly viewTagName: string;
        canParseView(element: HTMLElement): boolean;
        protected applyCustomAttributes(model: TModel, view: HTMLInputElement): void;
        protected parseCustomAttributes(model: TModel, view: HTMLInputElement): void;
    }
}
declare namespace Endjin.Editor.View {
    class InputButtonAdapter extends InputAdapterBase<Model.InputButtonModel> {
        protected readonly modelContentType: string;
        protected readonly adapterDisplayName: string;
        protected readonly inputElementType: string;
        protected createModelInstance(): Model.InputButtonModel;
    }
}
declare namespace Endjin.Editor.View {
    class InputCheckboxAdapter extends InputAdapterBase<Model.InputCheckboxModel> {
        protected readonly modelContentType: string;
        protected readonly adapterDisplayName: string;
        protected readonly inputElementType: string;
        protected createModelInstance(): Model.InputCheckboxModel;
        protected applyCustomAttributes(model: Model.InputCheckboxModel, view: HTMLInputElement): void;
        protected parseCustomAttributes(model: Model.InputCheckboxModel, view: HTMLInputElement): void;
    }
}
declare namespace Endjin.Editor.Model {
    class InputColorModel extends InputModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
    }
}
declare namespace Endjin.Editor.View {
    class InputColorAdapter extends InputAdapterBase<Model.InputColorModel> {
        protected readonly modelContentType: string;
        protected readonly adapterDisplayName: string;
        protected readonly inputElementType: string;
        protected createModelInstance(): Model.InputColorModel;
    }
}
declare namespace Endjin.Editor.Model {
    class InputDateModel extends InputModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
    }
}
declare namespace Endjin.Editor.View {
    class InputDateAdapter extends InputAdapterBase<Model.InputDateModel> {
        protected readonly modelContentType: string;
        protected readonly adapterDisplayName: string;
        protected readonly inputElementType: string;
        protected createModelInstance(): Model.InputDateModel;
    }
}
declare namespace Endjin.Editor.Model {
    class InputEmailModel extends InputModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
    }
}
declare namespace Endjin.Editor.View {
    class InputEmailAdapter extends InputAdapterBase<Model.InputEmailModel> {
        protected readonly modelContentType: string;
        protected readonly adapterDisplayName: string;
        protected readonly inputElementType: string;
        protected createModelInstance(): Model.InputEmailModel;
    }
}
declare namespace Endjin.Editor.Model {
    class InputFileModel extends InputModelBase {
        static readonly ContentType: string;
        accept: Array<string>;
        readonly contentType: string;
    }
}
declare namespace Endjin.Editor.View {
    class InputFileAdapter extends InputAdapterBase<Model.InputFileModel> {
        protected readonly modelContentType: string;
        protected readonly adapterDisplayName: string;
        protected readonly inputElementType: string;
        protected createModelInstance(): Model.InputFileModel;
        protected applyCustomAttributes(model: Model.InputFileModel, view: HTMLInputElement): void;
        protected parseCustomAttributes(model: Model.InputFileModel, view: HTMLInputElement): void;
    }
}
declare namespace Endjin.Editor.Model {
    class InputImageModel extends InputModelBase {
        static readonly ContentType: string;
        sourceUri: string;
        alternateText: string;
        readonly contentType: string;
    }
}
declare namespace Endjin.Editor.View {
    class InputImageAdapter extends InputAdapterBase<Model.InputImageModel> {
        protected readonly modelContentType: string;
        protected readonly adapterDisplayName: string;
        protected readonly inputElementType: string;
        protected createModelInstance(): Model.InputImageModel;
        protected applyCustomAttributes(model: Model.InputImageModel, view: HTMLInputElement): void;
        protected parseCustomAttributes(model: Model.InputImageModel, view: HTMLInputElement): void;
    }
}
declare namespace Endjin.Editor.Model {
    class InputMonthModel extends InputModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
    }
}
declare namespace Endjin.Editor.View {
    class InputMonthAdapter extends InputAdapterBase<Model.InputMonthModel> {
        protected readonly modelContentType: string;
        protected readonly adapterDisplayName: string;
        protected readonly inputElementType: string;
        protected createModelInstance(): Model.InputMonthModel;
    }
}
declare namespace Endjin.Editor.Model {
    class InputNumberModel extends InputModelBase {
        static readonly ContentType: string;
        valueAsInteger: number;
        valueAsFloat: number;
        readonly contentType: string;
    }
}
declare namespace Endjin.Editor.View {
    class InputNumberAdapter extends InputAdapterBase<Model.InputNumberModel> {
        protected readonly modelContentType: string;
        protected readonly adapterDisplayName: string;
        protected readonly inputElementType: string;
        protected createModelInstance(): Model.InputNumberModel;
    }
}
declare namespace Endjin.Editor.Model {
    class InputPasswordModel extends InputModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
    }
}
declare namespace Endjin.Editor.View {
    class InputPasswordAdapter extends InputAdapterBase<Model.InputPasswordModel> {
        protected readonly modelContentType: string;
        protected readonly adapterDisplayName: string;
        protected readonly inputElementType: string;
        protected createModelInstance(): Model.InputPasswordModel;
    }
}
declare namespace Endjin.Editor.View {
    class InputRadioAdapter extends InputAdapterBase<Model.InputRadioModel> {
        protected readonly modelContentType: string;
        protected readonly adapterDisplayName: string;
        protected readonly inputElementType: string;
        protected createModelInstance(): Model.InputRadioModel;
        protected applyCustomAttributes(model: Model.InputRadioModel, view: HTMLInputElement): void;
        protected parseCustomAttributes(model: Model.InputRadioModel, view: HTMLInputElement): void;
    }
}
declare namespace Endjin.Editor.Model {
    class InputRangeModel extends InputModelBase {
        static readonly ContentType: string;
        step: number | "any";
        readonly contentType: string;
    }
}
declare namespace Endjin.Editor.View {
    class InputRangeAdapter extends InputAdapterBase<Model.InputRangeModel> {
        protected readonly modelContentType: string;
        protected readonly adapterDisplayName: string;
        protected readonly inputElementType: string;
        protected createModelInstance(): Model.InputRangeModel;
        protected applyCustomAttributes(model: Model.InputRangeModel, view: HTMLInputElement): void;
        protected parseCustomAttributes(model: Model.InputRangeModel, view: HTMLInputElement): void;
    }
}
declare namespace Endjin.Editor.Model {
    class InputSearchModel extends InputModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
    }
}
declare namespace Endjin.Editor.View {
    class InputSearchAdapter extends InputAdapterBase<Model.InputSearchModel> {
        protected readonly modelContentType: string;
        protected readonly adapterDisplayName: string;
        protected readonly inputElementType: string;
        protected createModelInstance(): Model.InputSearchModel;
    }
}
declare namespace Endjin.Editor.Model {
    class InputSubmitModel extends InputModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
    }
}
declare namespace Endjin.Editor.View {
    class InputSubmitAdapter extends InputAdapterBase<Model.InputSubmitModel> {
        protected readonly modelContentType: string;
        protected readonly adapterDisplayName: string;
        protected readonly inputElementType: string;
        protected createModelInstance(): Model.InputSubmitModel;
    }
}
declare namespace Endjin.Editor.Model {
    class InputTelephoneModel extends InputModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
    }
}
declare namespace Endjin.Editor.View {
    class InputTelephoneAdapter extends InputAdapterBase<Model.InputTelephoneModel> {
        protected readonly modelContentType: string;
        protected readonly adapterDisplayName: string;
        protected readonly inputElementType: string;
        protected createModelInstance(): Model.InputTelephoneModel;
    }
}
declare namespace Endjin.Editor.Model {
    class InputTextModel extends InputModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
    }
}
declare namespace Endjin.Editor.View {
    class InputTextAdapter extends InputAdapterBase<Model.InputTextModel> {
        protected readonly modelContentType: string;
        protected readonly adapterDisplayName: string;
        protected readonly inputElementType: string;
        protected createModelInstance(): Model.InputTextModel;
    }
}
declare namespace Endjin.Editor.Model {
    class InputTimeModel extends InputModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
    }
}
declare namespace Endjin.Editor.View {
    class InputTimeAdapter extends InputAdapterBase<Model.InputTimeModel> {
        protected readonly modelContentType: string;
        protected readonly adapterDisplayName: string;
        protected readonly inputElementType: string;
        protected createModelInstance(): Model.InputTimeModel;
    }
}
declare namespace Endjin.Editor.Model {
    class InputUrlModel extends InputModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
    }
}
declare namespace Endjin.Editor.View {
    class InputUrlAdapter extends InputAdapterBase<Model.InputUrlModel> {
        protected readonly modelContentType: string;
        protected readonly adapterDisplayName: string;
        protected readonly inputElementType: string;
        protected createModelInstance(): Model.InputUrlModel;
    }
}
declare namespace Endjin.Editor.Model {
    class InputWeekModel extends InputModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
    }
}
declare namespace Endjin.Editor.View {
    class InputWeekAdapter extends InputAdapterBase<Model.InputUrlModel> {
        protected readonly modelContentType: string;
        protected readonly adapterDisplayName: string;
        protected readonly inputElementType: string;
        protected createModelInstance(): Model.InputWeekModel;
    }
}
declare namespace Endjin.Editor.Model {
    class InsertedModel extends ChildContentModelBase {
        static readonly ContentType: string;
        citeUri: string | null;
        dateTime: string | null;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class InsertedAdapter extends ViewAdapterBase<HTMLModElement, Model.InsertedModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.InsertedModel;
        protected applyCustomAttributes(model: Model.InsertedModel, view: HTMLModElement): void;
        protected parseCustomAttributes(model: Model.InsertedModel, view: HTMLModElement): void;
    }
}
declare namespace Endjin.Editor.Model {
    class KeyboardInputModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class KeyboardInputAdapter extends ViewAdapterBase<HTMLElement, Model.KeyboardInputModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.KeyboardInputModel;
    }
}
declare namespace Endjin.Editor.Model {
    class LabelModel extends ChildContentModelBase {
        static readonly ContentType: string;
        targetModelId: string;
        readonly contentType: string;
        readonly isInteractive: boolean;
        readonly acceptsTypes: string[];
        canAccept(index: number, child: IModel): boolean;
    }
}
declare namespace Endjin.Editor.View {
    class LabelAdapter extends ViewAdapterBase<HTMLLabelElement, Model.LabelModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.LabelModel;
        protected applyCustomAttributes(model: Model.LabelModel, view: HTMLLabelElement): void;
        protected parseCustomAttributes(model: Model.LabelModel, view: HTMLLabelElement): void;
    }
}
declare namespace Endjin.Editor.Model {
    class MapModel extends ChildContentModelBase {
        static readonly ContentType: string;
        name: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class MapAdapter extends ViewAdapterBase<HTMLMapElement, Model.MapModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.MapModel;
        protected applyCustomAttributes(model: Model.MapModel, view: HTMLMapElement): void;
        protected parseCustomAttributes(model: Model.MapModel, view: HTMLMapElement): void;
    }
}
declare namespace Endjin.Editor.Model {
    class MarkModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class MarkAdapter extends ViewAdapterBase<HTMLElement, Model.MarkModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.MarkModel;
    }
}
declare namespace Endjin.Editor.Model {
    class MeterModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        value: number;
        minimum: number;
        maximum: number;
        low: number;
        high: number;
        optimum: number;
        readonly acceptsTypes: string[];
        canAccept(index: number, child: IModel): boolean;
    }
}
declare namespace Endjin.Editor.View {
    class MeterAdapter extends ViewAdapterBase<HTMLMeterElement, Model.MeterModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.MeterModel;
        protected applyCustomAttributes(model: Model.MeterModel, view: HTMLMeterElement): void;
        protected parseCustomAttributes(model: Model.MeterModel, view: HTMLMeterElement): void;
    }
}
declare namespace Endjin.Editor.Model {
    class OutputModel extends ChildContentModelBase {
        static readonly ContentType: string;
        name: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class OutputAdapter extends ViewAdapterBase<HTMLOutputElement, Model.OutputModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.OutputModel;
        protected applyCustomAttributes(model: Model.OutputModel, view: HTMLOutputElement): void;
        protected parseCustomAttributes(model: Model.OutputModel, view: HTMLOutputElement): void;
    }
}
declare namespace Endjin.Editor.Model {
    class ProgressModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        maximum: number;
        value: number;
        readonly acceptsTypes: string[];
        canAccept(index: number, child: IModel): boolean;
    }
}
declare namespace Endjin.Editor.View {
    class ProgressAdapter extends ViewAdapterBase<HTMLProgressElement, Model.ProgressModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.ProgressModel;
        protected applyCustomAttributes(model: Model.ProgressModel, view: HTMLProgressElement): void;
        protected parseCustomAttributes(model: Model.ProgressModel, view: HTMLProgressElement): void;
    }
}
declare namespace Endjin.Editor.Model {
    class QuoteModel extends ChildContentModelBase {
        static readonly ContentType: string;
        citeUri: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class QuoteAdapter extends ViewAdapterBase<HTMLQuoteElement, Model.QuoteModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.QuoteModel;
        protected applyCustomAttributes(model: Model.QuoteModel, view: HTMLQuoteElement): void;
        protected parseCustomAttributes(model: Model.QuoteModel, view: HTMLQuoteElement): void;
    }
}
declare namespace Endjin.Editor.Model {
    class RubyModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class RubyAdapter extends ViewAdapterBase<HTMLElement, Model.RubyModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.RubyModel;
    }
}
declare namespace Endjin.Editor.Model {
    class SampleModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class SampleAdapter extends ViewAdapterBase<HTMLElement, Model.SampleModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.SampleModel;
    }
}
declare namespace Endjin.Editor.Model {
    class OptionGroupModel extends ChildContentModelBase {
        static readonly ContentType: string;
        isDisabled: boolean | null;
        label: string | null;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.Model {
    class SelectModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        autofocus: boolean | null;
        isDisabled: boolean | null;
        allowMultiple: boolean | null;
        name: string;
        isRequired: boolean | null;
        size: number | null;
        readonly isInteractive: boolean;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class SelectAdapter extends ViewAdapterBase<HTMLSelectElement, Model.SelectModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.SelectModel;
        protected applyCustomAttributes(model: Model.SelectModel, view: HTMLSelectElement): void;
        protected parseCustomAttributes(model: Model.SelectModel, view: HTMLSelectElement): void;
    }
}
declare namespace Endjin.Editor.Model {
    class SetOffModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class SetOffAdapter extends ViewAdapterBase<HTMLElement, Model.SetOffModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.SetOffModel;
    }
}
declare namespace Endjin.Editor.Model {
    class SmallTextModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class SmallTextAdapter extends ViewAdapterBase<HTMLElement, Model.SmallTextModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.SmallTextModel;
    }
}
declare namespace Endjin.Editor.Model {
    class SpanModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class SpanAdapter extends ViewAdapterBase<HTMLSpanElement, Model.SpanModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.SpanModel;
    }
}
declare namespace Endjin.Editor.Model {
    class StrikethroughModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class StrikethroughAdapter extends ViewAdapterBase<HTMLElement, Model.StrikethroughModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.StrikethroughModel;
    }
}
declare namespace Endjin.Editor.Model {
    class StrongModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class StrongAdapter extends ViewAdapterBase<HTMLElement, Model.StrongModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.StrongModel;
    }
}
declare namespace Endjin.Editor.Model {
    class SubscriptModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class SubscriptAdapter extends ViewAdapterBase<HTMLElement, Model.SubscriptModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.SubscriptModel;
    }
}
declare namespace Endjin.Editor.Model {
    class SuperscriptModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class SuperscriptAdapter extends ViewAdapterBase<HTMLElement, Model.SuperscriptModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.SuperscriptModel;
    }
}
declare namespace Endjin.Editor.Model {
    enum TextWrapping {
        Soft = "soft",
        Hard = "hard",
        Off = "off",
    }
    class TextAreaModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        autofocus: boolean;
        columns: number;
        rows: number | null;
        isDisabled: boolean | null;
        maximumLength: number | null;
        minimumLength: number | null;
        isReadOnly: boolean | null;
        spellCheck: boolean | null;
        wrap: TextWrapping | null;
        readonly isInteractive: boolean;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class TextAreaAdapter extends ViewAdapterBase<HTMLTextAreaElement, Model.TextAreaModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.TextAreaModel;
        protected applyCustomAttributes(model: Model.TextAreaModel, view: HTMLTextAreaElement): void;
        protected parseCustomAttributes(model: Model.TextAreaModel, view: HTMLTextAreaElement): void;
    }
}
declare namespace Endjin.Editor.Model {
    class TimeModel extends ChildContentModelBase {
        static readonly ContentType: string;
        dateTime: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class TimeAdapter extends ViewAdapterBase<HTMLTimeElement, Model.TimeModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.TimeModel;
        protected applyCustomAttributes(model: Model.TimeModel, view: HTMLTimeElement): void;
        protected parseCustomAttributes(model: Model.TimeModel, view: HTMLTimeElement): void;
    }
}
declare namespace Endjin.Editor.Model {
    class VariableModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class VariableAdapter extends ViewAdapterBase<HTMLElement, Model.VariableModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.VariableModel;
    }
}
declare namespace Endjin.Editor.Model {
    class WordBreakModel extends EmptyContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
    }
}
declare namespace Endjin.Editor.View {
    class WordBreakAdapter extends ViewAdapterBase<HTMLElement, Model.WordBreakModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.WordBreakModel;
    }
}
declare namespace Endjin.Editor.View {
    class ArticleAdapter extends ViewAdapterBase<HTMLElement, Model.ArticleModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.ArticleModel;
    }
}
declare namespace Endjin.Editor.View {
    class AsideAdapter extends ViewAdapterBase<HTMLElement, Model.AsideModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.AsideModel;
    }
}
declare namespace Endjin.Editor.Model {
    class NavigationModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class NavigationAdapter extends ViewAdapterBase<HTMLElement, Model.NavigationModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.NavigationModel;
    }
}
declare namespace Endjin.Editor.Model {
    class SectionModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class SectionAdapter extends ViewAdapterBase<HTMLElement, Model.SectionModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.SectionModel;
    }
}
declare namespace Endjin.Editor.View {
    class DescriptionListDefinitionAdapter extends ViewAdapterBase<HTMLElement, Model.DescriptionListDefinitionModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.DescriptionListDefinitionModel;
    }
}
declare namespace Endjin.Editor.View {
    class DescriptionListTermAdapter extends ViewAdapterBase<HTMLElement, Model.DescriptionListTermModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.DescriptionListTermModel;
    }
}
declare namespace Endjin.Editor.View {
    class FigureCaptionAdapter extends ViewAdapterBase<HTMLElement, Model.FigureCaptionModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.FigureCaptionModel;
    }
}
declare namespace Endjin.Editor.View {
    class LegendAdapter extends ViewAdapterBase<HTMLElement, Model.LegendModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.LegendModel;
    }
}
declare namespace Endjin.Editor.View {
    class ListItemAdapter extends ViewAdapterBase<HTMLLIElement, Model.ListItemModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.ListItemModel;
        protected applyCustomAttributes(model: Model.ListItemModel, view: HTMLLIElement): void;
        protected parseCustomAttributes(model: Model.ListItemModel, view: HTMLLIElement): void;
    }
}
declare namespace Endjin.Editor.View {
    class OptionAdapter extends ViewAdapterBase<HTMLOptionElement, Model.OptionModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.OptionModel;
        protected applyCustomAttributes(model: Model.OptionModel, view: HTMLOptionElement): void;
        protected parseCustomAttributes(model: Model.OptionModel, view: HTMLOptionElement): void;
    }
}
declare namespace Endjin.Editor.View {
    class OptionGroupAdapter extends ViewAdapterBase<HTMLOptGroupElement, Model.OptionGroupModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.OptionGroupModel;
        protected applyCustomAttributes(model: Model.OptionGroupModel, view: HTMLOptGroupElement): void;
        protected parseCustomAttributes(model: Model.OptionGroupModel, view: HTMLOptGroupElement): void;
    }
}
declare namespace Endjin.Editor.View {
    class SourceAdapter extends ViewAdapterBase<HTMLSourceElement, Model.SourceModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.SourceModel;
        protected applyCustomAttributes(model: Model.SourceModel, view: HTMLSourceElement): void;
        protected parseCustomAttributes(model: Model.SourceModel, view: HTMLSourceElement): void;
    }
}
declare namespace Endjin.Editor.Model {
    class SummaryModel extends ChildContentModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
        readonly acceptsTypes: string[];
        canAccept(index: number, child: IModel): boolean;
    }
}
declare namespace Endjin.Editor.View {
    class SummaryAdapter extends ViewAdapterBase<HTMLSummaryElement, Model.SummaryModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.SummaryModel;
    }
}
declare namespace Endjin.Editor.View {
    class TableBodyAdapter extends ViewAdapterBase<HTMLTableSectionElement, Model.TableBodyModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.TableBodyModel;
    }
}
declare namespace Endjin.Editor.View {
    class TableCaptionAdapter extends ViewAdapterBase<HTMLTableCaptionElement, Model.TableCaptionModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.TableCaptionModel;
    }
}
declare namespace Endjin.Editor.View {
    class TableCellAdapter extends ViewAdapterBase<HTMLTableCellElement, Model.TableCellModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.TableCellModel;
        protected applyCustomAttributes(model: Model.TableCellModel, view: HTMLTableCellElement): void;
        protected parseCustomAttributes(model: Model.TableCellModel, view: HTMLTableCellElement): void;
    }
}
declare namespace Endjin.Editor.View {
    class TableColumnAdapter extends ViewAdapterBase<HTMLTableColElement, Model.TableColumnModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.TableColumnModel;
        protected applyCustomAttributes(model: Model.TableColumnModel, view: HTMLTableColElement): void;
        protected parseCustomAttributes(model: Model.TableColumnModel, view: HTMLTableColElement): void;
    }
}
declare namespace Endjin.Editor.View {
    class TableColumnGroupAdapter extends ViewAdapterBase<HTMLTableColElement, Model.TableColumnGroupModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.TableColumnGroupModel;
        protected applyCustomAttributes(model: Model.TableColumnGroupModel, view: HTMLTableColElement): void;
        protected parseCustomAttributes(model: Model.TableColumnGroupModel, view: HTMLTableColElement): void;
    }
}
declare namespace Endjin.Editor.View {
    class TableFooterAdapter extends ViewAdapterBase<HTMLTableSectionElement, Model.TableFooterModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.TableFooterModel;
    }
}
declare namespace Endjin.Editor.View {
    class TableHeaderAdapter extends ViewAdapterBase<HTMLTableSectionElement, Model.TableHeaderModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.TableHeaderModel;
    }
}
declare namespace Endjin.Editor.View {
    class TableHeaderCellAdapter extends ViewAdapterBase<HTMLTableHeaderCellElement, Model.TableHeaderCellModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.TableHeaderCellModel;
        protected applyCustomAttributes(model: Model.TableHeaderCellModel, view: HTMLTableHeaderCellElement): void;
        protected parseCustomAttributes(model: Model.TableHeaderCellModel, view: HTMLTableHeaderCellElement): void;
    }
}
declare namespace Endjin.Editor.View {
    class TableRowAdapter extends ViewAdapterBase<HTMLTableSectionElement, Model.TableRowModel> {
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.TableRowModel;
    }
}
declare namespace Endjin.Editor.Model {
    class GoogleMapsModel extends ChildContentModelBase {
        static readonly ContentType: string;
        embedCode: string;
        height: string;
        width: string;
        readonly contentType: string;
        readonly isInteractive: boolean;
        readonly acceptsTypes: string[];
    }
}
declare namespace Endjin.Editor.View {
    class GoogleMapsAdapter extends ViewAdapterBase<HTMLIFrameElement, Model.GoogleMapsModel> {
        readonly priority: number;
        protected readonly adapterDisplayName: string;
        protected readonly modelContentType: string;
        protected readonly viewTagName: string;
        protected createModelInstance(): Model.GoogleMapsModel;
        canParseView(element: HTMLElement): boolean;
        protected applyCustomAttributes(model: Model.GoogleMapsModel, view: HTMLIFrameElement): void;
        protected parseCustomAttributes(model: Model.GoogleMapsModel, view: HTMLIFrameElement): void;
        private getSrcFromEmbedCode(embedCode);
    }
}
declare namespace Endjin.Editor.View {
    function registerDefaultAdapters(viewEngine: ViewEngine): void;
}
declare namespace Endjin.Editor.View {
    interface IViewEventHandler {
        attachToView(view: HTMLElement): void;
        destroy(): void;
        editor: IEditor;
    }
}
declare namespace Endjin.Editor.Model {
    class CommandBatch {
        private commands;
        private static isExecutingBatch;
        constructor(commands: Array<IDocumentCommand>);
        execute(): Array<IModel>;
        undo(): Array<IModel>;
        private pruneModels(modelsToRender);
    }
}
declare namespace Endjin.Editor.Model {
    interface IDocumentCommand {
        readonly commandType: string;
        canExecute(): boolean;
        execute(): Array<IModel>;
        undo(): Array<IModel>;
    }
}
declare namespace Endjin.Editor.Model {
    class BackspaceCommand implements IDocumentCommand {
        private editor;
        private selection;
        readonly commandType: string;
        constructor(editor: IEditor, selection: Selection | null);
        canExecute(): boolean;
        execute(): IModel[];
        undo(): IModel[];
    }
}
declare namespace Endjin.Editor.Model {
    class NewlineCommand implements IDocumentCommand {
        private editor;
        private selection;
        readonly commandType: string;
        constructor(editor: IEditor, selection: Selection | null);
        canExecute(): boolean;
        execute(): IModel[];
        undo(): IModel[];
    }
}
declare namespace Endjin.Editor.Model {
    class DeleteCommand implements IDocumentCommand {
        private editor;
        private selection;
        readonly commandType: string;
        constructor(editor: IEditor, selection: Selection | null);
        canExecute(): boolean;
        execute(): IModel[];
        undo(): IModel[];
    }
}
declare namespace Endjin.Editor.Model {
    class InsertTextCommand implements IDocumentCommand {
        private editor;
        private selection;
        private textRun;
        readonly commandType: string;
        private originalTextRun;
        constructor(editor: IEditor, selection: Selection | null, textRun: string);
        canExecute(): boolean;
        execute(): IModel[];
        undo(): IModel[];
    }
}
declare namespace Endjin.Editor.View {
    class TypingHandler implements IViewEventHandler {
        private subscription;
        editor: IEditor;
        attachToView(view: HTMLElement): void;
        destroy(): void;
        private isSafeKey(keyCode, altKey, shiftKey, controlKey, metaKey);
    }
}
declare namespace Endjin.Editor.View {
    class ClipboardHandler implements IViewEventHandler {
        private cutSubscription;
        private copySubscription;
        private pasteSubscription;
        private executingOperation;
        editor: IEditor;
        attachToView(view: HTMLElement): void;
        destroy(): void;
    }
}
declare namespace Endjin.Editor.View {
    function registerDefaultHandlers(viewEngine: ViewEngine, document: Model.Document): void;
}
declare namespace Endjin.Editor {
    interface IEditor {
        document: Model.Document;
        keyboardShortcuts: Model.KeyboardShortcutEngine;
        selection: Model.Selection | null;
        executeCommand(command: Model.IDocumentCommand): void;
        executeBatch(batch: Model.CommandBatch): void;
        destroyModels(...models: Array<Model.IModel>): void;
    }
    function createAndInsert(id: string, html: string): IEditor;
    function create(id: string): IEditor;
    function getEditorFor(element: HTMLElement): IEditor | null;
}
declare namespace Endjin.Editor.Model {
    function isModelElementBefore(f: IModel, s: IModel): boolean;
    function getNextModel(model: IModel): IModel | null;
    function getPreviousModel(model: IModel): IModel | null;
    function getDeepestRightmostChild(root: IModel): IModel;
    function removeChildFromParent(child: IModel): boolean;
    function isModelElementAfter(f: IModel, s: IModel): boolean;
    function getCommonAncestor(f: IModel, s: IModel): IModel | null;
}
declare namespace Endjin.Editor.Model {
    class Range {
        readonly start: number;
        readonly end: number;
        constructor(start: number, end: number);
    }
}
declare namespace Endjin.Editor.Model {
    class Keypress {
        keyCode: number;
        shiftKey: boolean;
        altKey: boolean;
        controlKey: boolean;
        metaKey: boolean;
        constructor(keyCode: number, shiftKey?: boolean, altKey?: boolean, controlKey?: boolean, metaKey?: boolean);
        equals(other: Keypress): boolean;
    }
}
declare namespace Endjin.Editor.Model {
    class Keychord {
        first: Keypress;
        second: Keypress | null;
        constructor(first: Keypress, second?: Keypress | null);
        equals(other: Keychord): boolean;
    }
}
declare namespace Endjin.Editor.Model {
    class InputDateTimeLocalModel extends InputModelBase {
        static readonly ContentType: string;
        readonly contentType: string;
    }
}
declare namespace Endjin.Editor.View {
    class InputDateTimeLocalAdapter extends InputAdapterBase<Model.InputDateTimeLocalModel> {
        protected readonly modelContentType: string;
        protected readonly adapterDisplayName: string;
        protected readonly inputElementType: string;
        protected createModelInstance(): Model.InputDateTimeLocalModel;
    }
}
