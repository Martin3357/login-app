import { useState } from "react";
import { Routes, Route, Navigate, Router } from "react-router-dom";
import Login from "./Login-Components/Login";
import SignUp from "./Login-Components/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
