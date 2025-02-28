import React, { createContext, useState, useContext, useEffect } from "react";

export const BoardsContext = createContext();

export const BoardsProvider = ({ children }) => {
    const [boards, setBoards] = useState([]);

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL


    const addBoard = (board) => {
        setBoards((prevBoards) => [...prevBoards, board])
    }

    useEffect(() => {
        const fetchBoards = async () => {
          const response = await fetch(`${BACKEND_URL}/api/getboards`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
          }); 
          const data = await response.json();
          console.log('Fetched data:', data); 
          setBoards(Array.isArray(data.boards) ? data.boards : []); 
        };
    
        fetchBoards();
      }, []);
    
    return (
        <BoardsContext.Provider value={{ boards, addBoard }}>
            {children}
        </BoardsContext.Provider>
    )
}