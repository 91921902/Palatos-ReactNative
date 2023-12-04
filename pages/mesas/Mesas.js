import React from "react"
import api from "../../providers/api.js"
import { useEffect } from "react"
import { Image, View, Text, ScrollView, TextInput, Animated, Easing, Pressable } from "react-native"
import { useState } from "react"
import { styles } from "./styles"
import BotaoVoltar from "../../components/BotaoVoltar.js"
import ItemMesa from "../../components/ItemMesa.js"
import { useFormTools} from "../../providers/FormRestContext.js"




/* - COPIAR ISSO PARA USAR A FONT PERSONALIZADA - */

import * as Font from 'expo-font';
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import BotaoQRCode from "../../components/BotaoQRCode"
import { useFocusEffect } from "@react-navigation/native"


function Mesas({ navigation }) {


    const {mesaTools, mesas} = useFormTools()
    const [codigoMesa, setCodigoMesa] = useState("")
    const [fontLoaded, setFontLoaded] = useState(false);


    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                'lemonada': fontLemonada,
                'kavoon': fontKavoon
            });
            setFontLoaded(true);
        }

        loadFonts();
        
        async function carregaMesas() {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzLCJpZFJlc3RhdXJhbnRlIjo5LCJpYXQiOjE3MDA2MjM2MTMsImV4cCI6MjMwNTQyMzYxM30.U8MdfPqaAEwpkvwyut-U10cyB-eyVmYroC_twysSMu4"
            try {
                const response = await api.get("restaurante/mesa/9", {
                    headers: {
                        Authorization: token
                    }
                })
                mesaTools.setListaMesas(response.data.mesas)
            }
            catch (err) {
                console.log("Erro ao puxar mesas:", err)
            }
        }
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
            <BotaoQRCode onPress={() => navigation.navigate("EditarMesa")}/>
            <Text style={styles.titleMesa}>Mesas:</Text>
            <ScrollView style={{ height: "60%", width: "100%" }}>
                <View style={{ width: "100%", alignItems: "center", gap: 25 }}>
                    {mesas.length > 0 ? (
                        mesas.map((obj) => (
                            <ItemMesa key={obj.id} tipoMenu={1} obj={obj} />
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