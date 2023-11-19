import React, {useEffect, useState} from "react";
import { ScrollView, View } from "react-native";
import { CheckBox } from "react-native-elements"
import { useFormTools } from "../providers/FormRestContext";
import api from "../providers/api";



export default function CheckBoxCategory({filter}) {
    
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

        /* let categorias = ["Massas", "Doces", "Pizzas", "Carnes", "Vegetariano", "Sopas", "Frutos do mar", "Saladas", "Sanduíches"]; */

        async function getAllCategorias() {
            const categorias = await api.get("categoria/").then(response => response.data.result)

            const nomeCategorias = []
            for(let obj of categorias) {
                nomeCategorias.push(obj.nome)
            }

            setCategorias(nomeCategorias)
            setNotChangeCategory(nomeCategorias)
        }

        getAllCategorias()

    }, [])

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