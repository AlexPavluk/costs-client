import { useStore } from "effector-react";
import { $auth, $username } from "../../context/auth";
import { useTheme } from "../../hooks"
import { removeUser } from "../../utils/authAlert";
import './style.scss'

export const Header = () => {
  const { switchTheme, theme } = useTheme();
  const username = useStore($username);
  const logetIn = useStore($auth);

  return (
    <header className={`navbar navbar-dark bg-${theme === 'dark' ? 'dark' : 'primary'}`}>
      <div className="container">
        <h1 style={{ color: 'white' }}>
          Costs App
        </h1>
        {username.length ?
          <h2 style={{ color: 'white' }} >{username}
          </h2> : ''}
        <button
          onClick={switchTheme}
          className={`btn btn-theme btn-${theme === 'dark' ? 'light' : 'dark'}`}
        >
          {theme === 'dark' ? 'Go ligth' : 'Go dark'}
        </button>
        {logetIn && <button onClick={removeUser} className="btn btn-logout btn-primary"> Выход </button>}
      </div>
    </header>
  )
}
