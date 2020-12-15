import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Constants } from "../constants";

/**
 * Validator de l'âge minimum de l'application
 * Devient un transformateur avec @IsUserHaveMinimumAge
 */
@ValidatorConstraint()
export class MatchMinimumAgeValidatorConstraint implements ValidatorConstraintInterface{
    validate(birthDate: any, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        // Si pas de date, c'est faux
        if (!birthDate || !(birthDate instanceof Date)) {
            return false;
        }

        // Calcul de l'âge
        const today = new Date();
        birthDate = birthDate as Date;
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();

        // Gestion du mois d'anniversaire en cours
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            age--;
        }

        // Return de la réponse
        return (age >= Constants.AGE_LIMIT);
    }
    
    /**
     * Message par défaut
     * @param validationArguments 
     */
    defaultMessage?(validationArguments?: ValidationArguments): string {
        return `La date de naissance n'est pas valide. 
        Vous devez être agé d'au moins ${Constants.AGE_LIMIT} ans.`;
    }
}

/**
 * Création du décorateur pour @MatchMinimumAgeValidator
 * @param validationOptions 
 */
export function IsUserHaveMinimumAge(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: MatchMinimumAgeValidatorConstraint,
        });
    };
}
