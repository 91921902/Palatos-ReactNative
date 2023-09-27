import React, { createContext, useContext, useState } from 'react';

const FormRestContext = createContext();

export const FormProvider = ({ children }) => {
    const [lastId, setLastId] = useState(0)
    const [menu, setMenu] = useState([{
        id: lastId,
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
        }, //ELE NÃO ESTA DELETANDO CORRETAMENTE(O STATE SE MANTEM DE ALUGM JEITO)
        createItem: () => {
            setLastId(lastId++)
            setMenu([...menu, {
                id: lastId,
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