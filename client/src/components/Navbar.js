import {NavLink, useHistory} from 'react-router-dom'
import {useContext, useEffect} from 'react'
import {AuthContext} from '../context/AuthContext'

export const Navbar = () => {
  const auth = useContext(AuthContext)
  const history = useHistory()
  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  useEffect(() => {
    const elems = document.querySelectorAll('.sidenav')
    window.M.Sidenav.init(elems)
  }, [])

  return (
    <>
      <nav className="navbar grey darken-1">
        <div className="nav-wrapper">
          <span className="brand-logo">"Сократитель"</span>
          <a href="/#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><NavLink to="/create">Создать</NavLink></li>
            <li><NavLink to="/links">Ссылки</NavLink></li>
            <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
          </ul>
        </div>
      </nav>
      <ul className="sidenav" id="mobile-demo">
        <li><NavLink to="/create">Создать</NavLink></li>
        <li><NavLink to="/links">Ссылки</NavLink></li>
        <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
      </ul>
    </>
  )
}