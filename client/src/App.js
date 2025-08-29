import React from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import AddressBar from "./components/address-bar/AddressBar";
import DirectoryTree from "./components/directory-tree/DirectoryTree";
import "./App.css";

function DirectoryPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname === "/" ? "/" : location.pathname;

  const handleNavigate = (newPath) => {
    const normalizedPath = newPath.startsWith("/") ? newPath : `/${newPath}`;

    navigate(normalizedPath);
  };

  return (
    <>
      <AddressBar currentPath={currentPath} onNavigate={handleNavigate} />
      <DirectoryTree currentPath={currentPath} onNavigate={handleNavigate} />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<DirectoryPage />} />
      </Routes>
    </div>
  );
}

export default App;
