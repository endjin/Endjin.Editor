/// <reference path="IModel.ts" />

namespace Endjin.Editor.Model {
    /** Represents a location in the model */
    export class Location {

        /**
         * Compare with another location for equality
         * @param other - the other location to compare
         * @returns - true if the locations represent the same position in the model
         */
        equals(other: Location): boolean {
            return this.model === other.model && this.index === other.index;    
        }

        /**
         * Determine if this location is before the other location
         * @param other - the other location to compare
         * @returns - true if this location is before the other location
         */
        isBefore(other: Location): boolean {
            if (this.model === other.model) {
                return this.index < other.index;
            }

            return isModelElementBefore(this.model, other.model);
        }

        /**
         * Determine if this location is after the other location
         * @param other - the other location to compare
         * @returns - true if this location is after the other location
         */
        isAfter(other: Location): boolean {
            if (this.model === other.model) {
                return this.index > other.index;
            }

            return isModelElementAfter(this.model, other.model);
        }

        /**
         * Creates an instance of a Location
         * @param model - the model containing the location
         * @param index - the index of the location within the element
         */
        constructor(public readonly model: IModel, public readonly index: number) { }
    }
}