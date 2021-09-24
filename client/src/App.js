import {useAuth} from './hooks/auth.hook'
import {useRoutes} from './routes'
import {BrowserRouter as Router} from 'react-router-dom'
import {AuthContext} from './context/AuthContext'
import {Navbar} from './components/Navbar'
import 'materialize-css'
import {Loader} from './components/Loader'

function App() {
  const {login, logout, token, userId, ready} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if (!ready) {
    return <Loader/>
  }

  return (
    <AuthContext.Provider value={{
      login, logout, token, userId, isAuthenticated
    }}>
      <Router>
        {isAuthenticated && <Navbar/>}
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
