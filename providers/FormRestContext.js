import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState } from 'react';
import api from "./api"

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
        file: "",
        tipo: "Categoria"
    }]);
    const [categorias, setCategorias] = useState([])

    const menuTools = {
        setNewMenu: (menu) => {
            setMenu(menu)
        },
        setItem: (item) => {
            const newMenu = [...menu];

            for (let i = 0 ; i < menu.length ; i++) {

                if (menu[i].id == item.id) {
                    newMenu[i] = item
                    break
                }
            }

            setMenu(newMenu);
        },
        deleteItem: (id) => {
            const oldMenu = [...menu];

            const newMenu = oldMenu.filter(item => item.id !== id);

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
                file: "",
                tipo: "Categoria"
            }])
            lastId++
        }
    };

    const setNewCategorias = (categorias) => {
       
        setCategorias(categorias)
        
    }

    const userTools = {

        authUser: async () => {

            const token = await AsyncStorage.getItem("token")

            const result = await api.get("users/auth/", { 
                headers: {
                    "Authorization": "Bearer " + token
                }
            })

            const isAuth = result.data.status == "success" ? true : false 

            return isAuth
        },

        signIn: async (username, password) => {

            const data = {
                username,
                password
            }

            try {

                const result = await api.post("/login", data)
                return result.data

            } catch (err) {

                return null
                
            }
        },

        signOut: async () => {
          
           await AsyncStorage.removeItem("token") //se der tempo fazer um blackList

        }
    }

    return (
        <FormRestContext.Provider value={{ menu, menuTools, categorias ,setNewCategorias, userTools}}>
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