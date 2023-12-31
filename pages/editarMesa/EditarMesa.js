import React from "react"
import api from "../../providers/api.js"
import { useEffect } from "react"
import { Image, View, Text, ScrollView, TextInput, Animated, Easing, Pressable } from "react-native"
import { useState } from "react"
import { styles } from "./styles"
import BotaoVoltar from "../../components/BotaoVoltar.js"
import ItemMesa from "../../components/ItemMesa.js"
import A11y from "../../providers/A11y.js"
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import { useFormTools } from "../../providers/FormRestContext.js"
import decode from "jwt-decode"

import * as Font from 'expo-font';
import fontLemonada from "../../assets/fonts/lemonada.ttf"


function EditarMesa({ navigation }) {


    const { mesaTools, mesas } = useFormTools()
    const [fontLoaded, setFontLoaded] = useState(false);


    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                'lemonada': fontLemonada,
                'kavoon': fontKavoon,
            });
            setFontLoaded(true);
        }

        loadFonts();

        async function carregaMesas() {
            const token = await AsyncStorage.getItem("token")
            let idRestaurante
            try {
                const decoded = decode(token)
                idRestaurante = decoded.idRestaurante
              } catch (error) {
                alert("erro")
              }

            try {
                const response = await api.get("restaurante/mesa/"+idRestaurante, {
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

    async function adicionarMesa() {
        await api.post("/restaurantes/mesas/addMesa", {})
            .then(response => {
                const resultado = response.data
            })
            .catch(error => {
                console.log(`Erro ao criar nova mesa: ${error.message}`)
            })
    }

    function backPage() {
        navigation.goBack()
    }

    return (
        <View style={styles.containerEditarMesa}>
            <BotaoVoltar onPress={backPage} />
            <Text style={styles.titleMesas}>Mesas:</Text>
            <ScrollView style={styles.boxMesas}>
                <View style={{ alignItems: "center", gap: 30 }}>
                    {mesas.length > 0 ? (
                        mesas.map((obj) => (
                            <ItemMesa key={obj.id} tipoMenu={2} obj={obj} />
                        ))
                    ) : (
                        <View></View>
                    )
                    }
                    <View style={{ alignItems: "flex-end", width: "100%", height: 100, justifyContent: "center", paddingRight: 40 }}>

                        <Pressable role="button" style={styles.btnAddMesa}
                            onPress={adicionarMesa}
                            {...A11y.label("Adicionar mesa ao restaurante")}>
                            <Image source={require("../../assets/icons/adicionar.png")} />
                        </Pressable>
                    </View>
                </View>
            </ScrollView >

        </View >
    );

}

export default EditarMesa