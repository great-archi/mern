import {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'

export const AuthPage = () => {
  const [form, setForm] = useState({
    email: '', password: ''
  })
  const auth = useContext(AuthContext)
  const {loading, request, error, clearError} = useHttp()
  const message = useMessage()

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      message(data.message)
    } catch (e) {
    }
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
    } catch (e) {
    }
  }

  return (
    <div className="row">
      <div className="col s12 m6 offset-m3">
        <h3 className="center">Добро пожаловать!</h3>
        <div className="card grey darken-1">
          <div className="card-content white-text">
            <div className="input-field">
              <input
                placeholder="Введите email"
                id="email"
                type="email"
                name="email"
                className="color-input"
                value={form.email}
                onChange={changeHandler}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-field">
              <input
                placeholder="Введите пароль"
                id="password"
                name="password"
                type="password"
                className="color-input"
                value={form.password}
                onChange={changeHandler}
              />
              <label htmlFor="first_name">Пароль</label>
            </div>
          </div>
          <div className="card-action">
            <button
              className="waves-effect btn green"
              disabled={loading}
              onClick={loginHandler}
            >
              Войти
            </button>
            <button
              className="waves-effect btn deep-orange right"
              disabled={loading}
              onClick={registerHandler}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}