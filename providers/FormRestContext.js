import React, { createContext, useContext, useState } from 'react';

const FormRestContext = createContext();

let lastId = 0

export const FormProvider = ({ children }) => {
  
    const [menu, setMenu] = useState([{
        id: lastId,
        nome: "",
        descricao: "",
        preco: "",
        foto: "",
        nomeImagem: "",
        file: ""
    }]);
    const [categorias, setCategorias] = useState([])

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
                id: lastId + 1,
                nome: "",
                descricao: "",
                preco: "",
                foto: "",
                nomeImagem: "",
                file: ""
            }])
            lastId++
        }
    };

    const setNewCategorias = (categorias) => {

        setCategorias(categorias)

    }

    return (
        <FormRestContext.Provider value={{ menu, menuTools, categorias ,setNewCategorias}}>
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