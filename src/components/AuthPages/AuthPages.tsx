import './style.scss';
import { MutableRefObject, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthClient } from '../../api/authClient';
import { Spinner } from '../Spiner/Spiner';
import { handleAlertMessage } from '../../utils/authAlert';
import { useTranslation } from 'react-i18next';


export const AuthPages = ({ type }: { type: 'login' | 'registration' }) => {
    const { t } = useTranslation();
    const currentTitle = type === 'login' ? <span>{t("login-title")}</span> : <span>{t("register-title")}</span>;
    const [spiner, setSpinner] = useState(false);
    const navigate = useNavigate()

    const usernameRef = useRef() as MutableRefObject<HTMLInputElement>;
    const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;

    const handleAuthResponse = (result: boolean | undefined, navigatePath: string, alertText: string | any) => {
        if (!result) {
            setSpinner(false);
            return;
        }

        setSpinner(false);
        navigate(navigatePath);
        handleAlertMessage({ alertText, alertStatus: 'success' });
    }

    const handleLogin = async (username: string, password: string) => {
        if (!username || !password) {
            setSpinner(false);
            handleAlertMessage({alertText: <span>{t("all-inputs-warn")}</span>, alertStatus: 'warning'});
            return
        }
        const result = await AuthClient.login(username, password);

        handleAuthResponse(result, '/costs', <span>{t("login-alert")}</span>);
    }

    const handleRegistracion = async (username: string, password: string) => {
        if (!username || !password) {
            setSpinner(false);
            handleAlertMessage({alertText: <span>{t("all-inputs-warn")}</span> , alertStatus: 'warning'});
            return
        }

        if (password.length < 4) {
            setSpinner(false);
            handleAlertMessage({alertText: <span>{t("passw-inputs-warn")}</span>, alertStatus: 'warning'});
            return
        }
        const result = await AuthClient.registracion(username, password);

        handleAuthResponse(result, '/login', <span>{t("reg-alert")}</span>);
    }

    const handleAuth = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSpinner(true);

        switch (type) {
            case 'login':
                handleLogin(usernameRef.current.value, passwordRef.current.value)
                break;
            case 'registration':
                handleRegistracion(usernameRef.current.value, passwordRef.current.value)
                break;

            default:
                break;
        }
    }

    return (
        <div className='container'>
            <h1>
                {currentTitle}
            </h1>
            <form className='form-group' onSubmit={handleAuth}>
                <label className='auth-lable'>
                    {t('name-input')}
                    <input
                        ref={usernameRef}
                        type="text"
                        className='form-control'
                    />
                </label>
                <label className='auth-lable'>
                    {t('password-input')}
                    <input
                        ref={passwordRef}
                        type="password"
                        className='form-control'
                    />
                </label>
                <button className='btn btn-primary auth-btn'>
                    {spiner ? <Spinner top={5} left={20} /> : currentTitle}
                </button>
            </form>
            {type === 'login' ?
                <>
                    <span className='question-text'>{t('login-ask')}</span>
                    <Link to={'/registration'}> {t('register-btn')} </Link>
                </> :
                <>
                    <span className='question-text'> {t('register-ask')}</span>
                    <Link to={'/login'}> {t('login-btn')} </Link>
                </>}
        </div>
    )
    
}

