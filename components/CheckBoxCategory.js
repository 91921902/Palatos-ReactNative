import React, {useEffect, useState} from "react";
import { ScrollView, View } from "react-native";
import { CheckBox } from "react-native-elements"



export default function CheckBoxCategory({filter}) {
    
    const [categorias, setCategorias] = useState([])
    const [categoriaFiltrada, setCategoriaFiltrada] = useState(filter || "")
    const [categoriasSelected, setCategoriasSelected] = useState(
        categorias.map(() => false)
    );

    useEffect(() => {
        async function setCategorys() {

            //buscar as categorias no banco
            let categorias = ["massas", "doces", "pizzas", "teste", "teste", "teste", "teste", "teste", "teste"]

            if (filter.length > 0) {
                
                const filtro = categorias.filter((categoria) => {
                    return categoria.toLowerCase().includes((filter).toLowerCase());
                });
                
                setCategorias(filtro)

            } else {
                setCategorias(categorias)
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