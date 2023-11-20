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
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import BotaoQRCode from "../../components/BotaoQRCode"


function Mesas({ navigation }) {


    const [mesas, setMesas] = useState([])
    const [codigoMesa, setCodigoMesa] = useState("")
    const [fontLoaded, setFontLoaded] = useState(false);


    useEffect(() => {
        async function carregaMesas() {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpZFJlc3RhdXJhbnRlIjoyLCJpYXQiOjE3MDA0OTM3MzAsImV4cCI6MjMwNTI5MzczMH0.76HH3mwRclhn7wt12Ca9IggTiKVxwfppwICUMTnpU5M"
            try {
                const response = await api.get("restaurante/mesa", {
                    headers: {
                        Authorization: token
                    }
                })
                setMesas(response.data)
                console.log(mesas)
            }
            catch (err) {
                console.log("Erro ao puxar mesas:", err)
            }
        }
        async function loadFonts() {
            await Font.loadAsync({
                'lemonada': fontLemonada,
                'kavoon': fontKavoon
            });
            setFontLoaded(true);
        }

        loadFonts();
        carregaMesas()
    }, []);

    if (!fontLoaded) {
        return null;
    }

    function backPage() {
        navigation.goBack()
    }


    return (
        <View style={styles.containerMesas}>
            <BotaoVoltar onPress={backPage} />
            <BotaoQRCode />
            <Text style={styles.titleMesa}>Mesas:</Text>
            <ScrollView style={{ height: "60%", width: "100%" }}>
                <View style={{ width: "100%", alignItems: "center", gap: 25 }}>
                    {mesas.length > 0 ? (
                        mesas.map((obj, key) => (
                            <ItemMesa key={key} tipoMenu={1} obj={obj} />
                        ))
                    ) : (
                        <View></View>
                    )
                    }
                </View>
            </ScrollView>
        </View>
    );

}

export default Mesas