import React, {useState, useEffect} from "react";
import { Text, TextInput, View, ScrollView, Pressable, Image } from "react-native";
import { styles } from "./styles"
import BotaoVoltar from "../../components/BotaoVoltar";
import MiniLogo from "../../components/MiniLogo";
import * as Font from 'expo-font';
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import ItemMenu from "../../components/ItemMenu";
import { useFormTools } from "../../providers/FormRestContext";
import api from "../../providers/api";


function NovoMenu() {

    const [fontLoaded, setFontLoaded] = useState(false);
    const { menu } = useFormTools()

    useEffect(() => {
        async function loadFonts() {
        await Font.loadAsync({
            'kavoon': fontKavoon,
            'lemonada': fontLemonada,
        });
        setFontLoaded(true);
        }

        loadFonts();
    }, []);

    if (!fontLoaded) {
        return null; 
    }

    function showMenu() {
        console.log(menu)
    }
    
    function createRestaurant() { 
        const token = "colocar o token aqui"

        const data = {
            data: "dados do restaurante"
        }

        const novoRestaurante = api.post("/restaurante/add", data, //podemos criar no access token o id do restautante do usuario, para facilitar a busca dos dados
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': token
                }
            }
        )
    }

    return(
        <View style={styles.containerNovoMenu}>
            <BotaoVoltar />
            <MiniLogo />
            <View style={styles.boxQuantMesas}>
                <Text style={styles.textQuantMesas} accessibility={false} aria-hidden>Quantidade de mesas do seu Restaurante:</Text>
                <TextInput 
                    keyboardType="numeric"
                    style={styles.inputQuantMesas}
                    cursorColor={"#92A14D"}
                    accessibilityLabel="Quantidade de mesas do seu restaurante"
                />
            </View>
            <View style={styles.titleMenu}>
               <Text style={styles.textTitleMenu}>Faça seu Menu:</Text>
            </View>
            <ScrollView style={{width: "100%",height: "50%"}}>
                <View style={styles.menuItens}>

                    {
                        menu.map((item, index) => {
                            return(
                               <ItemMenu key={item.id} item={item} index={index}/> 
                            );
                        })
                    }

                </View>
            </ScrollView>
            <View style={styles.boxFinalizarMenu}>
                <Pressable style={styles.btnFinalizarMenu} accessibilityRole="button" onPress={showMenu}>
                    <Text style={styles.textFinalizarMenu}>Finalizar Menu</Text>
                </Pressable>
            </View>
        </View>
    );

}

// function criar() {
//     const obj = {
//         idUser,
//         nome,
//         descricao,
//         foto,
//         plano,
//         endereco,
//         cep,
//         rua,
//         configRestaurante,
//         contato,
//         contato: {
//             telefone,
//             celular,
//         },
//         configRestaurante: {
//             reservasAtivas,
//             tempoTolerancia,
//             avaliacaoComida
//         }
//     }
// }

export default NovoMenu