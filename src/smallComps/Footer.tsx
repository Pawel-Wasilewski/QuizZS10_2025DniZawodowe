import {USER_CREDENTIAL} from "../cookieData/userCredentialWrapper.ts";

export function Footer() {
    const userCredential = USER_CREDENTIAL();
    return (
        <footer className="text-center mt-5 mb-3 text-sm text-gray-500">
            UserID: {userCredential}
        </footer>
    );
}