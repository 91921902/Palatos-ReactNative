import React from "react"
import api from "../../api/axios"
import { useEffect } from "react"
import { Image, View, Text, ScrollView, Pressable } from "react-native"
import { useState } from "react"
import { styles } from "./styles"
import BotaoVoltar from "../../components/BotaoVoltar.js"
import Comanda from "../../components/Comanda.js"
import A11y from "../../providers/A11y.js"



/* - COPIAR ISSO PARA USAR A FONT PERSONALIZADA - */

import * as Font from 'expo-font';
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import fontKavoon from "../../assets/fonts/kavoon.ttf"


function TelaComanda({ navigation }) {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpZFJlc3RhdXJhbnRlIjoyLCJpYXQiOjE2OTkzNzc3MDEsImV4cCI6MjMwNDE3NzcwMX0.6zUFwtaQfXUlxX_o_OSnDzfq5yawuf4Qd2mAv_Lbqmw"


    const [comandas, setComandas] = useState([])
    const [fontLoaded, setFontLoaded] = useState(false);


    useEffect(() => {
        async function carregaComandas() {
            //Puxar do backend
            let tempoAtual = new Date().getTime() / 1000

            let listaComandas = []

            try {
                const result = await api.get("/restaurante/comandas", {
                    headers: {
                        Authorization: token
                    }
                })
                listaComandas = result.data.ListaComandas
            } catch (err) {
                console.log(`Erro ao puxar comandas: ${err}`)
            }
            setComandas(listaComandas)
        }

        async function loadFonts() {
            await Font.loadAsync({
                'lemonada': fontLemonada,
                'kavoon': fontKavoon
            });
            setFontLoaded(true);
        }

        loadFonts();
        carregaComandas()
    }, []);

    if (!fontLoaded) {
        return null;
    }

    async function deletaComanda(obj) {
        const result = await api.delete(`/restaurante/comandas/delete/${obj.id}`, {
            headers: {
                Authorization: token
            }
        })
        if (result.status !== 200) {
            console.log("Erro ao deletar comanda")
        }
    }

    function backPage() {

        navigation.goBack()

    }

    return (
        <View style={styles.container}>
            <BotaoVoltar onPress={backPage} />
            <Text style={styles.title}>Comandas:</Text>
            <ScrollView contentContainerStyle={{ width: "100%" }}>
                <View style={styles.comandas}>
                    {comandas.length > 0 && (
                        comandas.map((obj) => (
                            <Comanda key={obj.id} obj={obj} deletaComanda={deletaComanda} />
                        ))
                    )}
                </View>
            </ScrollView >
        </View >
    );

}

export default TelaComanda