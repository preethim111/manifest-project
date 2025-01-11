import { createContext, useState } from 'react';  
  
const HeaderContext = createContext();  
  
const HeaderProvider = ({ children }) => {  
  const [isHomeClicked, setIsHomeClicked] = useState(false);  
  const [isCreateClicked, setIsCreateClicked] = useState(false);
  const [isVisionBoardsClicked, setIsVisionBoardsClicked] = useState(false);
  
  return (  
   <HeaderContext.Provider value={{  
    isHomeClicked,  
    setIsHomeClicked,  
    isCreateClicked,  
    setIsCreateClicked, 
    isVisionBoardsClicked,
    setIsVisionBoardsClicked
   }}>  
    {children}  
   </HeaderContext.Provider>  
  );  
};  
  
export { HeaderProvider, HeaderContext };