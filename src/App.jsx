import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { Tooltip } from "@mantine/core";
// import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import {
  Ecommerce,
  Orders,
  Calendar,
  Employee,
  Stacked,
  Pyramid,
  Customers,
  Kanban,
  Line,
  Area,
  Bar,
  Pie,
  Financial,
  ColorPicker,
  ColorMapping,
  Editor,
} from "./pages";
import "./App.css";

import { useStateContext } from "./contexts/ContextProvider";

function App() {
  const {
    currentMode,
    setMode,
    setColor,
    currentColor,
    themeSettings,
    activeMenu,
    setThemeSettings,
    setActiveMenu,
    setCurrentMode,
    setCurrentColor,
  } = useStateContext();
  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themMode");
    // checking if the currentThemColor and currentThemeMode are present in the localStorage.
    if (currentThemeMode && currentThemeMode) {
      setCurrentMode(currentThemeColor);
      setCurrentColor(currentThemeMode);
    }
  });
  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4 " style={{ zIndex: "1000" }}>
            <Tooltip label="settings" withArrow>
              <button
                type="button"
                className="text-3xl text-white p-3  hover:bg-light-gray "
                style={{ background: currentColor, borderRadius: "50%" }}
                onClick={() => setThemeSettings(true)}
              >
                <FiSettings />
              </button>
            </Tooltip>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed dark:bg-secondary-dark-bg bg-white">
              <Sidebar />x
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full"
                : "dark:bg-main-dark-bg bg-main-bg w-full min-h-screen flex-2"
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
              <Navbar />
            </div>
            <div>
              {themeSettings && <ThemeSettings />}
              <Routes>
                {/* dashboard */}
                <Route path="/" element={<Ecommerce />}></Route>
                <Route path="/ecommerce" element={<Ecommerce />}></Route>
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
