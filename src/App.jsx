import { Routes, Route } from 'react-router'
import { Header } from '@C/Layouts/Header/Header.jsx'
import { Home } from '@C/Pages/Home/Home.jsx'
import { MainContainer } from '@C/Layouts/MainContainer/MainContainer.jsx'
import { Footer } from '@C/Layouts/Footer/Footer.jsx'

export const App = () => {
  return (
    <>
      <Header/>
      <MainContainer styles="flex-1 flex items-center justify-center p-4 mb-4">
        <Routes>
          <Route path='/' element={<Home />}></Route>
        </Routes>
      </MainContainer>
      {/* <Footer/> */}
    </>
  )
}
