import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'

import App from '../App'
import routes from './routes.data'

const config = (
  <Route
    element={<App />}
    errorElement={<h1>404 - Not found.</h1>}
    path={routes.main}
  />
)

export default createBrowserRouter(createRoutesFromElements(config))
