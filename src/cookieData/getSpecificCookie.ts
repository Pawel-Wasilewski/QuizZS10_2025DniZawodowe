import Cookies from 'js-cookie';
import type { customUserData } from "./addCustomUserData.ts";

interface GetSpecificCookie {
    name: string;
}
export function getSpecificCookie(name: GetSpecificCookie["name"]): customUserData | null {
    const cookieValue = Cookies.get(name);
    if (cookieValue !== undefined) {
        return {
            name: name,
            value: cookieValue
        };
    }
    return null;
}