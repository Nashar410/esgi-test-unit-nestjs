export class Constants {

    /*****************************************************************
     *                             User                              *
     *****************************************************************/
    public static readonly AGE_LIMIT = 13;
    public static readonly UNESECURE_SALT = "NoTaSeCuRePaSsWoRd"

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
}
