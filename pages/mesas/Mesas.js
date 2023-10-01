import React from "react"
import api from "../../api/axios"
import { useEffect } from "react"
import { Image, View, Text, ScrollView, TextInput, Animated, Easing, Pressable } from "react-native"
import { useState } from "react"
import { styles } from "./styles"
import BotaoVoltar from "../../components/BotaoVoltar.js"
import ItemMesa from "../../components/ItemMesa.js"



/* - COPIAR ISSO PARA USAR A FONT PERSONALIZADA - */

import * as Font from 'expo-font';
import fontLemonada from "../../assets/fonts/lemonada.ttf"


function Mesas() {


    const [mesas, setMesas] = useState([])
    const [codigoMesa, setCodigoMesa] = useState("")
    const [fontLoaded, setFontLoaded] = useState(false);


    useEffect(() => {
        async function carregaMesas() {
            //Tem que puxar do backend, fim do mundo
            let listaMesas = [
                {
                    id: 1,
                    ocupada: false,
                    identificacao_mesa: "Mesa 1"
                },
                {
                    id: 2,
                    ocupada: true,
                    identificacao_mesa: "Mesa 2"
                },
                {
                    id: 3,
                    ocupada: false,
                    identificacao_mesa: "Mesa 3"
                },
            ]
            setMesas(listaMesas)
        }
        async function loadFonts() {
            await Font.loadAsync({
                'lemonada': fontLemonada,
            });
            setFontLoaded(true);
        }

        loadFonts();
        carregaMesas()
    }, []);

    if (!fontLoaded) {
        return null;
    }


    return (
        <View>
            {/* <BotaoVoltar /> */}
            <ScrollView style={{ height: "60%" }}>
                {mesas.length > 0 ? (
                    mesas.map((obj, key) => (
                        <ItemMesa key={key} tipoMenu={1} obj={obj} />
                    ))
                ) : (
                    <View></View>
                )
                }
            </ScrollView>
        </View>
    );

}

export default Mesas