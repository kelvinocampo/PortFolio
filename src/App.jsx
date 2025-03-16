import { Routes, Route } from 'react-router'
import { Header } from '@C/Layouts/Header/Header.jsx'
import { Home } from '@C/Pages/Home/Home.jsx'
import { MainContainer } from '@C/Layouts/MainContainer/MainContainer.jsx'
import { Footer } from '@C/Layouts/Footer/Footer.jsx'
import {Skills} from "@C/Pages/Skills/Skills.jsx"
import {NoPage} from "@C/Pages/NoPage/NoPage.jsx"
import {Experience} from "@C/Pages/Experience/Experience.jsx"

export const App = () => {
  return (
    <>
      <Header/>
      <MainContainer styles="flex-1 flex items-center justify-center px-4 py-12">
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/Skills' element={<Skills />}></Route>
          <Route path='/Experience' element={<Experience />}></Route>
          <Route path='*' element={<NoPage />}></Route>
        </Routes>
      </MainContainer>
      <Footer/>
    </>
  )
}
