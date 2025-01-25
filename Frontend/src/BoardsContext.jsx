import React, { createContext, useState, useContext, useEffect } from "react";

export const BoardsContext = createContext();

export const BoardsProvider = ({ children }) => {
    const [boards, setBoards] = useState([]);

    const addBoard = (board) => {
        setBoards((prevBoards) => [...prevBoards, board])
    }

    useEffect(() => {
        const fetchBoards = async () => {
          const response = await fetch('http://localhost:3000/api/getboards', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
          }); 
          const data = await response.json();
          console.log('Fetched data:', data); 
          setBoards(data.boards); 
        };
    
        fetchBoards();
      }, []);
    
    return (
        <BoardsContext.Provider value={{ boards, addBoard }}>
            {children}
        </BoardsContext.Provider>
    )
}