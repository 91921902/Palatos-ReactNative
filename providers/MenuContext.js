import React, { createContext, useContext, useState } from 'react';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {

    const [menu, setMenu] = useState([{
        nome: "",
        descricao: "",
        preco: "",
        foto: ""
    }]);

    const setNewMenu = (menu) => {
        setMenu(menu)
    }

    const setItem = (item, index) => {
        
        const newMenu = [...menu];
        newMenu[index] = item;
        setMenu(newMenu);
       
    }

    const createItem = () => {
        setMenu([...menu, {
            nome: "",
            descricao: "",
            preco: "",
            foto: ""
        }])
    }

    return (
        <MenuContext.Provider value={{ menu, createItem, setNewMenu, setItem }}>
        {children}
        </MenuContext.Provider>
    );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu deve ser usado dentro de um MenuProvider');
  }
  return context;
};