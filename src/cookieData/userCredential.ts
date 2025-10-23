import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';

const COOKIE_USER_CREDENTIAL: string = 'user_credential';
const COOKIE_USER_CREDENTIAL_EXPIRES_DAYS: number = 30;

export const generateUserCredential = (): string => {
    let userCredential = Cookies.get(COOKIE_USER_CREDENTIAL);
    if (!userCredential)
    {
        userCredential = uuidv4();
        Cookies.set(COOKIE_USER_CREDENTIAL, userCredential, { expires: COOKIE_USER_CREDENTIAL_EXPIRES_DAYS });
    }
    return userCredential;
}