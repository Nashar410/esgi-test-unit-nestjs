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


}
