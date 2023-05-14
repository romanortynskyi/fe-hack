import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'

import Routes from '~/types/enums/routes'
import SignUp from '~/pages/sign-up'

const config = (
  <Route
    element={<SignUp />}
    errorElement={<h1>404 - Not found.</h1>}
    path={Routes.SignUp}
  />
)

export default createBrowserRouter(createRoutesFromElements(config))
