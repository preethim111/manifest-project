import React, { createContext, useState, useContext } from "react";

export const BoardsContext = createContext();

export const BoardsProvider = ({ children }) => {
    const [boards, setBoards] = useState([]);

    const addBoard = (board) => {
        setBoards((prevBoards) => [...prevBoards, board])
    }
    
    return (
        <BoardsContext.Provider value={{ boards, addBoard }}>
            {children}
        </BoardsContext.Provider>
    )
}