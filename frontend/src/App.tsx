
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signin from './components/Signin'
import Signup from './components/signup'
import Dashboard from './components/Dashboard'
import SendMoney from './components/SendMoney'

function App() {
 

  return (
  <>
    <BrowserRouter>
      <Routes>
          <Route path='/signin' element={<Signin/>} />
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/send' element={<SendMoney/>}/>
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
