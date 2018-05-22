/// <reference path="../CommonModelTypes.ts" />
/// <reference path="../FlowContent/FormModel.ts" />

namespace Endjin.Editor.Model {
    export enum AutocompleteOptions {
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
        Photo = "photo"
    }

    export enum SelectionDirection {
        None = "none",
        Forward = "forward",
        Backward = "backward"
    }

    export abstract class InputModelBase extends EmptyContentModelBase {
        value: string = "";
        autocomplete: AutocompleteOptions = AutocompleteOptions.On;
        isDisabled: boolean = false;
        autofocus: boolean = false;
        formActionUri: string | null = null;
        formMethod: FormSubmitMethod | string | null = null;
        formEncodingType: FormEncodingType | null = null;
        formNoValidation: boolean | null = null;
        formTarget: FormTarget | string | null = null;
        minimum: string | null = null;
        maximum: string | null = null;
        minimumLength: number | null = null;
        maximumLength: number | null = null;
        pattern: string | null = null;
        placeholder : string | null = null;
        isReadOnly: boolean | null = null;
        isRequired: boolean | null = null;
        selectionDirection: SelectionDirection | null = null;
        selectionStart: number | null = null;
        selectionEnd: number | null = null;
        spellCheck: boolean | null = null;

        get isInteractive(): boolean {
            return !this.isHidden;
        };

    }
}