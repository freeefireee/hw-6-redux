import React from 'react'
import UserList from './Components/UserList/UserList'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from './Components'
import { Main } from './pages'


const App = () => {
  return (
    <div>
      <Router>
<Routes>
  <Route  element={<Header/>}>
    <Route path='/' element={<Main/>}/>
  </Route>
</Routes>
      </Router> 
         </div>
  )
}

export default App;
