import Cookies from 'js-cookie';

export type customUserData = {
    name: string;
    value: string | number | boolean;
    expirationDays?: number | null;
}
export function addCustomUserData(data: customUserData) {
    if (data.expirationDays == null)
    {
        data.expirationDays = 30;
    }
    const existingDataString = Cookies.get(data.name);
    if (!existingDataString)
    {
        Cookies.set(data.name, data.value.toString(), { expires: data.expirationDays });
    }

}