import React from "react";
import './App.css'
import AppRoutes from "./routes";
import { AchievementProvider } from "./context/AchievementContext";

function App() {
  return (
    <AchievementProvider>
      <AppRoutes />
    </AchievementProvider>
  )
}

export default App;