import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'

import Routes from '~/types/enums/routes'
import SignUp from '~/pages/sign-up'
import Main from '~/pages/main'
import App from '~/containers/app'
import Login from '~/pages/login'

const config = (
  <Route
    element={<App />}
    errorElement={<h1>404 - Not found.</h1>}
    path={Routes.Main}
  >
    <Route
      element={<Main />}
      errorElement={<h1>404 - Not found.</h1>}
      path={Routes.Main}
    />
    <Route
      element={<SignUp />}
      errorElement={<h1>404 - Not found.</h1>}
      path={Routes.SignUp}
    />
    <Route
      element={<Login />}
      errorElement={<h1>404 - Not found.</h1>}
      path={Routes.Login}
    />
  </Route>
)

export default createBrowserRouter(createRoutesFromElements(config))
