export class Constants {

    /*****************************************************************
     *                             User                              *
     *****************************************************************/
    public static readonly AGE_LIMIT = 13;
    public static readonly UNESECURE_SALT = "NoTaSeCuRePaSsWoRd"
    public static readonly MIN_PWD_STR = 8;
    public static readonly MAX_PWD_STR = 40;
    /*****************************************************************
     *                             Item                              *
     *****************************************************************/
    public static readonly MAX_ITEM_LENGTH = 10;
    public static readonly MIN_CONTENT_LENGTH_STR = 1;
    public static readonly MAX_CONTENT_LENGTH_STR = 1000;
    public static readonly LIMIT_BETWEEN_CREATION = 60000 * 30 //30 min
    public static readonly ITEM_NUMBER_TO_SEND_MAIL = 8;
    public static readonly MAIL_ITEM_CAPACITY_SOON_EXCEED =
        `Bonjour, 
        Vous venez d'enregistrer votre ${Constants.ITEM_NUMBER_TO_SEND_MAIL
            + Constants.ITEM_NUMBER_TO_SEND_MAIL === 1 ? "er" : "ème"}.
        La limite est de ${Constants.MAX_ITEM_LENGTH}.
        Passez en premium pour un nombre illimité d'item.`;
    
    
    /*****************************************************************
     *                             Errors                             *
     *****************************************************************/
    public static readonly ERROR_MSG_IS_NOT_EMPTY = `Le champ est vide.\n`;
    public static readonly ERROR_MSG_IS_UUID = `Le champ n'est pas un UUID.\n`;
    public static readonly ERROR_MSG_IS_STRING = `Le champ n'est pas une chaine de caractères.\n`;
    public static readonly ERROR_MSG_IS_EMAIL = `Le champ n'est pas un mail.\n`;
    public static readonly ERROR_MSG_LENGTH_PWD = `Le champ doit faire entre ${Constants.MIN_PWD_STR} et ${Constants.MAX_PWD_STR} caractères.\n`;
    public static readonly ERROR_MSG_IS_DATE = `Le champ n'est pas une date valide.\n`;
    public static readonly ERROR_MSG_USER_WRONG_AGE = `L'utilisateur doit avoir au moins ${Constants.AGE_LIMIT} ans.\n`
    public static readonly ERROR_MSG_UNKNOWN_ERROR = `Erreur non identifiée\n`;
    public static readonly ERROR_MSG_ITEM_NAME_NOT_UNIQUE = `L'item soumis existe déjà.\n`;
    public static readonly ERROR_MSG_LENGTH_CONTENT = `Le contenu de l'item soumis doit être comprit entre ${Constants.MIN_CONTENT_LENGTH_STR} et ${Constants.MAX_CONTENT_LENGTH_STR}.\n`;
    public static readonly ERROR_MSG_ITEM_DIDNT_CREATE = `L'item n'a pas pu être créée\n`;
    public static readonly ERROR_MSG_LIMIT_ITEM_EXCEED = `La todolist a atteint le maximum de ${Constants.MAX_ITEM_LENGTH} items.`;
    public static readonly ERROR_MSG_LIMIT_BETWEEN_ITEM_CREATION = `La dernière création d'item remonte à moins de ${180000/Constants.LIMIT_BETWEEN_CREATION} minutes.`;

}
