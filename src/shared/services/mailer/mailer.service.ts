import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerService {
    sendMail(destMail: string, content: string) {
        // envoyé le mail

        // renvoyé ok si ok
        return true;
    }
}
