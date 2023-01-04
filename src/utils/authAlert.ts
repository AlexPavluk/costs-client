import { setCosts } from "../context";
import { setAlert } from "../context/alert"
import { setAuth, setUsername } from "../context/auth";
import { IAlert } from "../types"

export const removeUser = () => {
    localStorage.removeItem('auth');
    setAuth(false);
    setUsername('');
    setCosts([]);
}

export const handleAlertMessage = (alert: IAlert) => {
    setAlert(alert);
    setTimeout(() => setAlert({alertText: '', alertStatus: ''}), 3000)
}

export const getAuthDataFromLS = () => {
    try {
        const LSData = JSON.parse(localStorage.getItem('auth') as string);

        if (!LSData) {
            removeUser();
            return;
        }

        return LSData;
    } catch (error) {
        removeUser();
    }
}