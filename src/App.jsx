import { Header } from "@/components/Header"
import { Experience } from "@/components/Experience"
import { Skills } from "@/components/Skills"
import { Projects } from "@/components/Projects"
import { Contact } from "@/components/Contact"
import { Navigate, Route, Routes } from "react-router"

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/es" replace />} />
      <Route path="/:language" element={
        <>
          <Header />
          <Experience />
          <Skills />
          <Projects />
          <Contact />
        </>
      } />
    </Routes>
  )
}
