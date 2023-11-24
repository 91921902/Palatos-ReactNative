import React, {useEffect, useState} from "react";
import { ScrollView, View } from "react-native";
import { CheckBox } from "react-native-elements"
import { useFormTools } from "../providers/FormRestContext";
import api from "../providers/api";



export default function CheckBoxCategory({filter, categoriasEdit}) {
    
    const [categorias, setCategorias] = useState([])
    const [notChageCategory, setNotChangeCategory] = useState([])
    const [categoriaFiltrada, setCategoriaFiltrada] = useState(filter || "")
    const [categoriasSelected, setCategoriasSelected] = useState(
        categorias.map(() => false)
    );
    
    
    const { setNewCategorias } = useFormTools()

    useEffect(() => {
        
        const categoriasEscolhidas = []

        for (let i = 0 ; i < categorias.length ; i++) {
            
            if (categoriasSelected[i]) {

                categoriasEscolhidas.push(categorias[i])

            }

        }

        setNewCategorias(categoriasEscolhidas)

    }, [categoriasSelected])

    useEffect(() => {

        async function getAllCategorias() {
            const categorias = await api.get("categoria/").then(response => response.data.result)

            const nomeCategorias = []
            for(let obj of categorias) {
                nomeCategorias.push(obj.nome)
            }

            setCategorias(nomeCategorias)
            setNotChangeCategory(nomeCategorias)

            
            if (categoriasEdit) {
                const allIndex = []
                for (let categoria of categoriasEdit) {

                    const index = categorias.findIndex(obj => obj.nome == categoria)
                    allIndex.push(index)

                }
                
                // ERRO DE RENDERIZACAO

                for (let i = 0 ; i < categorias.length ; i++) {
                    let isChecked = false
                    if (allIndex.length == 0) {
                        break
                    }
                    for (let index of allIndex) {
                        
                        if (index == i) {
                            isChecked = true

                            const array = [...categoriasSelected]
                            array[i] = true
                            setCategoriasSelected(array)
                            
                            const indexRemove = allIndex.indexOf(index)
                            allIndex.splice(indexRemove, 1)
                        }
                    }

                    if (!isChecked) {
                        const array = [...categoriasSelected]
                        array[i] = false
                        setCategoriasSelected(array)
                    }

                }
            }
        }

        getAllCategorias()

    }, [])

    // coloca isso categoriasEdit dentro do []
    
    useEffect(() => {
        async function setCategorys() {

            if (filter.length > 0) {
                
                const filtro = notChageCategory.filter((categoria) => {
                    return categoria.toLowerCase().includes((filter).toLowerCase());
                });
                
                setCategorias(filtro)

            } else {
                setCategorias(notChageCategory)
            }

        } 
        setCategorys()
    }, [filter])

    function setCategory(indexCategory) {
        const newCategoriasSelected = [...categoriasSelected];
        newCategoriasSelected[indexCategory] = !newCategoriasSelected[
          indexCategory
        ];
        setCategoriasSelected(newCategoriasSelected);
    }


    
    return(
        <View>
            {
                categorias.map((category, index) => {
                    console.log(categoriasSelected)
                    return(
                        <CheckBox 
                            title={category}
                            checkedIcon="check"
                            uncheckedIcon="square-o"
                            uncheckedColor="#445A14"
                            checkedColor="#445A14"
                            checked={categoriasSelected[index]}
                            containerStyle={{borderWidth: 0,  justifyContent: "center", backgroundColor: "transparent"}}
                            textStyle={{fontFamily: "lemonada", color:"#445A14"}}

                            onPress={() => setCategory(index)}
                            key={index}
                        />
                    );
                })
            }
        </View>
    );
}