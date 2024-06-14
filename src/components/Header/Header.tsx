import { useStore } from "effector-react";
import { $auth, $username } from "../../context/auth";
import { useTheme } from "../../hooks"
import { removeUser } from "../../utils/authAlert";
import { LanguageDropDown } from "../LanguageDropDown/LanguageDropDown";
import './style.scss'

export const Header = () => {
  const { switchTheme, theme } = useTheme();
  const username = useStore($username);
  const logetIn = useStore($auth);

  return (
    <header className={`navbar navbar-dark bg-${theme === 'dark' ? 'dark' : 'primary'}`}>
      <div className="container">
        <h1 className="title">
          Costs App
        </h1>
        {username.length ?
          <h2 style={{ color: 'white' }} >{username}
          </h2> : ''}
        <div className="justify-content-sm-between">
          <button
            onClick={switchTheme}
            className={`btn ml-2 btn-theme btn-${theme === 'dark' ? 'light' : 'dark'}`}
          >
            {theme === 'dark' ? <img alt="Go ligth" src="/light-mode.png" /> : <img alt="Go ligth" src="/dark-mode.png" />}
          </button>

          {logetIn && <button onClick={removeUser} className="btn mr-0 btn-logout btn-primary"> <img src="/logout.png" alt="Log out" /> </button>}
          <LanguageDropDown />
        </div>
      </div>
    </header>
  )
}
