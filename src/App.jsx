import { Routes, Route } from 'react-router'
import { Header } from '@C/Layouts/Header/Header.jsx'
import { Home } from '@C/Pages/Home/Home.jsx'

export const App = () => {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home />}></Route>
      </Routes>
    </>
  )
}
