import { BrowserRouter} from 'react-router-dom'
import Navbar from './components/Navbar'
import Router from './routes/Router'
function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Router />      
    </BrowserRouter>
  )
}

export default App
