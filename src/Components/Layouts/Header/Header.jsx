import { Navbar } from "@C/Layouts/NavBar/NavBar.jsx";
import { ItemNavBar } from '@C/UI/ItemNavBar/ItemNavBar.jsx';
import NavBarIcon from '@A/navbar.svg';
import { useState } from "react";

export const Header = () => {
  const [estateNavBar, setEstateNavBar] = useState("hidden");
  const ItemStyles = "block py-0 sm:py-4 text-gray-300 hover:text-blue-400 font-medium";

  const handleEstateNavBar = () => {
    setEstateNavBar(estateNavBar === "hidden" ? "flex" : "hidden");
  };

  return (
    <header className="bg-gray-900 w-full p-4 text-center flex items-center justify-between gap-8 flex-col sm:flex-row sm:justify-center">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-semibold text-blue-400 leading-6">Kevin Ocampo</h1>
        <img
          aria-label="Toggle navigation menu"
          className="w-8 block py-4 sm:hidden cursor-pointer"
          onClick={handleEstateNavBar}
          src={NavBarIcon}
          alt="Icon Button to Deploy NavBar"
        />
      </div>
      <Navbar
        styles={{
          nav: `justify-center items-center ${estateNavBar} sm:flex`,
          ul: "flex justify-center items-center gap-6",
        }}
      >
        <ItemNavBar styles={ItemStyles} url="/">Inicio</ItemNavBar>
        <ItemNavBar styles={ItemStyles} url="/Skills">Habilidades</ItemNavBar>
        <ItemNavBar styles={ItemStyles} url="/Experience">Experiencia</ItemNavBar>
      </Navbar>
    </header>
  );
};