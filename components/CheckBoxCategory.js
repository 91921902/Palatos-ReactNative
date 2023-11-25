import React, {useEffect, useState} from "react";
import { ScrollView, View } from "react-native";
import { CheckBox } from "react-native-elements"
import { useFormTools } from "../providers/FormRestContext";
import api from "../providers/api";



export default function CheckBoxCategory({filter, categoriasEdit}) {
    
    const [categorias, setCategorias] = useState([])
    const [notChageCategory, setNotChangeCategory] = useState([])
    const [categoriaFiltrada, setCategoriaFiltrada] = useState(filter || "")
    const [categoriasSelected, setCategoriasSelected] = useState([]);
    
    
    const { setNewCategorias } = useFormTools()

    useEffect(() => {
        
        const categoriasEscolhidas = []

        for (let i = 0 ; i < categorias.length ; i++) {
            
            if (categorias[i].checked) {

                categoriasEscolhidas.push(categorias[i].nome)
                console.log(categorias[i].nome)
            }

        }

        setNewCategorias(categoriasEscolhidas)
        
       
    }, [categorias])

    useEffect(() => {

        async function getAllCategorias() {

            const categorias = await api.get("categoria/").then(response => response.data.result)
            const nomeCategorias = []

            const copyCategory = [...categorias]

            for(let obj of copyCategory) {
                nomeCategorias.push(obj.nome)
                obj.checked = false
            }

            setCategorias(copyCategory)

            setNotChangeCategory(copyCategory)
            
            if (categoriasEdit) {

                const copyCategory = [...categorias]
               
                for (let categoriaEdit of categoriasEdit) {

                    for (let categoria of copyCategory) {

                        if (categoria.nome == categoriaEdit) {

                            categoria.checked = true

                        }

                    }

                }

                setCategorias(copyCategory)

            }
        }

        getAllCategorias()

    }, [categoriasEdit])
    
    useEffect(() => {
        async function setCategorys() {

            if (filter.length > 0) {
                
                const filtro = notChageCategory.filter((categoria) => {
                    return categoria.nome.toLowerCase().includes((filter).toLowerCase());
                });
                
                setCategorias(filtro)

            } else {
                setCategorias(notChageCategory)
            }

        } 
        setCategorys()
    }, [filter])

    function setCategory(idCategory) {
        
        const copyCategory = [...categorias]
        
        for(let categoria of copyCategory) {

            if (categoria.id == idCategory) {

                categoria.checked = !categoria.checked
                break
            }

        }

        setCategorias(copyCategory)

    }
    
    return(
        <View>
            {
                categorias.map((category, index) => {
                   
                    return(
                        <CheckBox 
                            title={category.nome}
                            checkedIcon="check"
                            uncheckedIcon="square-o"
                            uncheckedColor="#445A14"
                            checkedColor="#445A14"
                            checked={category.checked}
                            containerStyle={{borderWidth: 0,  justifyContent: "center", backgroundColor: "transparent"}}
                            textStyle={{fontFamily: "lemonada", color:"#445A14"}}

                            onPress={() => setCategory(category.id)}
                            key={index}
                        />
                    );
                })
            }
        </View>
    );
}