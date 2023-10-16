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
import AsyncStorage from '@react-native-async-storage/async-storage';



async function createRestaurant(formData, navigation, menu) {   

    

    //let token = await AsyncStorage.getItem("token")
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpZFJlc3RhdXJhbnRlIjoxMCwiaWF0IjoxNjk3MzE5ODA2LCJleHAiOjIzMDIxMTk4MDZ9.qtaulig33bBqC3wGjBvAwKFJjCaRRJXffZynzvN72As"
    console.log('aqui: ' + JSON.stringify(formData))
    const novoRestaurante = await api.post("/restaurante/add", formData, 
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": "Bearer " + token
            }
        }
    )

    console.log(novoRestaurante)

    token = novoRestaurante.data.token

    await AsyncStorage.setItem("token", token)

    const restauranteData = novoRestaurante.data

    createMenu(token, navigation, restauranteData, menu)
}

async function createMenu(token, navigation, restaurante, menu) {

    const data = []
    console.log(menu)
    for (let i = 0; i < menu.length; i++) {

        const menuItem = menu[i]
        console.log(menuItem)
        const formDataMenu = new FormData()

        formDataMenu.append('nome', menuItem.nome)
        formDataMenu.append('descricao', menuItem.descricao)
        formDataMenu.append('preco', menuItem.preco)
        formDataMenu.append('nomeImagem', menuItem.nomeImagem)
        formDataMenu.append('file', menuItem.foto)

        console.log("aqui")
        console.log(formDataMenu.has('nome'))
        console.log(formDataMenu.has('descricao'))
        console.log(formDataMenu.has('preco'))
        console.log(formDataMenu.has('nomeImagem'))
        console.log(formDataMenu.has('file'))

        data.push(formDataMenu)
    }


    console.log(data)

    const newMEnu = await api.post("/restaurante/cardapio/add", data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': token
        }
    })

    //navigation.navigate("PainelADM", { restaurante })

    console.log(newMEnu)

}

function NovoMenu({navigation, route}) {

    const [fontLoaded, setFontLoaded] = useState(false);
    const [formRestaurante, setFormRestaurante] = useState("")
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

        const {formData} = route.params;
        setFormRestaurante(formData)
    }, []);

    if (!fontLoaded) {
        return null; 
    }

    return(
        <View style={styles.containerNovoMenu}>
            <BotaoVoltar onPress={() => navigation.goBack()}/>
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
                               <ItemMenu key={item.id} item={item} id={item.id} index={index}/> 
                            );
                        })
                    }

                </View>
            </ScrollView>
            <View style={styles.boxFinalizarMenu}>
                <Pressable style={styles.btnFinalizarMenu} accessibilityRole="button" onPress={() => createRestaurant(formRestaurante, navigation, menu)}>
                    <Text style={styles.textFinalizarMenu}>Finalizar Menu</Text>
                </Pressable>
                {/* <Pressable style={styles.btnFinalizarMenu} accessibilityRole="button" onPress={() => teste()}>
                    <Text style={styles.textFinalizarMenu}>Finalizar Menu</Text>
                </Pressable> */}
            </View>
        </View>
    );

}

export default NovoMenu