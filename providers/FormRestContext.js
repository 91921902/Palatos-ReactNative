import React, { createContext, useContext, useState } from 'react';

const FormRestContext = createContext();

export const FormProvider = ({ children }) => {
  
    const [menu, setMenu] = useState([{
        nome: "",
        descricao: "",
        preco: "",
        foto: ""
    }]);

    const menuTools = {
        setNewMenu: (menu) => {
            setMenu(menu)
        },
        setItem: (item, index) => {
            const newMenu = [...menu];
            newMenu[index] = item;
            setMenu(newMenu);
        },
        deleteItem: (index) => {
            const newMenu = [...menu];
            newMenu.splice(index, 1);
            setMenu(newMenu);
        },
        createItem: () => {
            setMenu([...menu, {
                nome: "",
                descricao: "",
                preco: "",
                foto: ""
            }])
        }
    }

    return (
        <FormRestContext.Provider value={{ menu, menuTools}}>
        {children}
        </FormRestContext.Provider>
    );
};

export const useFormTools = () => {
  const context = useContext(FormRestContext);
  if (!context) {
    throw new Error('useMenu deve ser usado dentro de um FormProvider');
  }
  return context;
};