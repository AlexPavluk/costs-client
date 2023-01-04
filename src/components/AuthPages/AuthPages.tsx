import './style.scss';
import { MutableRefObject, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthClient } from '../../api/authClient';
import { Spinner } from '../Spiner/Spiner';
import { handleAlertMessage } from '../../utils/authAlert';



export const AuthPages = ({ type }: { type: 'login' | 'registration' }) => {
    const currentTitle = type === 'login' ? 'Войти' : 'Регистрация';
    const [spiner, setSpinner] = useState(false);
    const navigate = useNavigate()

    const usernameRef = useRef() as MutableRefObject<HTMLInputElement>;
    const passwordRef = useRef() as MutableRefObject<HTMLInputElement>;

    const handleAuthResponse = (result: boolean | undefined, navigatePath: string, alertText: string) => {
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
            handleAlertMessage({alertText: 'Заполните все поля', alertStatus: 'warning'});
            return
        }
        const result = await AuthClient.login(username, password);

        handleAuthResponse(result, '/costs', 'Вход выполнен');
    }

    const handleRegistracion = async (username: string, password: string) => {
        if (!username || !password) {
            setSpinner(false);
            handleAlertMessage({alertText: 'Заполните все поля', alertStatus: 'warning'});
            return
        }

        if (password.length < 4) {
            setSpinner(false);
            handleAlertMessage({alertText: 'Пароль должен содержать больше 4 символов', alertStatus: 'warning'});
            return
        }
        const result = await AuthClient.registracion(username, password);

        handleAuthResponse(result, '/login', 'Регистрация выполненна');
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
                    Введите свое имя
                    <input
                        ref={usernameRef}
                        type="text"
                        className='form-control'
                    />
                </label>
                <label className='auth-lable'>
                    Введите свой пароль
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
                    <span className='question-text'> Еще нет аккаунтa?</span>
                    <Link to={'/registration'}> За регистрироваться </Link>
                </> :
                <>
                    <span className='question-text'> У вас уже аккаунтa?</span>
                    <Link to={'/login'}> Войти </Link>
                </>}
        </div>
    )
    
}

