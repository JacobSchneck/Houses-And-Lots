import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Homes from './pages/Homes';
import Lots from './pages/Lots';
import Layout from './components/Layout';
import { HomePlanProvider } from './contexts/HomePlanContext';
import { LotProivider } from './contexts/LotContext';
import { CombinationProivider } from './contexts/CombinationContext';


// For easier adaption
const routes = [
  {
    path: "/homes",
    component: <Homes />
  }, 
  {
    path: "/lots",
    component: <Lots />,
  }
]

const App = () => {
  return (
    <Router>
      <Layout>
        <HomePlanProvider>
          <LotProivider>
            <CombinationProivider>
              <Routes>
                {routes.map(route => (
                  <Route path={route.path} element={route.component} />
                ))}
              </Routes>
            </CombinationProivider>
          </LotProivider>
        </HomePlanProvider>
      </Layout>
    </Router>
  )
}

export default App;