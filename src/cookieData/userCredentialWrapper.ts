import {useEffect, useState} from "react";
import {generateUserCredential} from "./userCredential.ts";

export const USER_CREDENTIAL = () => {
    const [userCredential, setUserCredential] = useState<string | null>(null);

    useEffect(() => {
        setUserCredential(generateUserCredential());
    }, []);

    return userCredential;
}