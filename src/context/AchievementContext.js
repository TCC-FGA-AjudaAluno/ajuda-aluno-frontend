import React, { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Toast } from "../helper/helper";
import Confetti from "react-confetti";

const AchievementContext = createContext();

export const AchievementProvider = ({ children }) => {
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [confettiActive, setConfettiActive] = useState(false);

  useEffect(() => {
   const socket = io("http://localhost:3000"); 

   socket.on("connect", () => {
      console.log("Conectado ao WebSocket do NestJS");
   });

   socket.on("achievementUnlocked", (newAchievement) => {
      //Verifica se já desbloqueou essa conquista antes
      console.log('unlockedAchievements', unlockedAchievements);
      if (!unlockedAchievements.some((ach) => ach.id === newAchievement.id)) {
      setUnlockedAchievements((prev) => [...prev, newAchievement]);
      setConfettiActive(true); 
      //toast de notificação
      Toast.fire({
            icon: "success",
            title: `🎉 Conquista desbloqueada: ${newAchievement.title}`
         });
         setTimeout(() => {
            setConfettiActive(false);
         }, 5000);
      }
      socket.emit('message', "Front-end confirma notificacao");
   });

   socket.on("disconnect", () => {
      console.log("Desconectado do WebSocket");
   });

   return () => {
      socket.disconnect(); 
   };
  }, [unlockedAchievements]);

  return (
    <AchievementContext.Provider value={{ unlockedAchievements }}>
      {children}
      {confettiActive && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false}/>}
    </AchievementContext.Provider>
    
  );
};


export const useAchievement = () => useContext(AchievementContext);
