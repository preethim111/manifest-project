import { createContext, useState } from 'react';  
  
const HeaderContext = createContext();  
  
const HeaderProvider = ({ children }) => {  
  const [isHomeClicked, setIsHomeClicked] = useState(false);  
  const [isCreateClicked, setIsCreateClicked] = useState(false);  
  
  return (  
   <HeaderContext.Provider value={{  
    isHomeClicked,  
    setIsHomeClicked,  
    isCreateClicked,  
    setIsCreateClicked,  
   }}>  
    {children}  
   </HeaderContext.Provider>  
  );  
};  
  
export { HeaderProvider, HeaderContext };
