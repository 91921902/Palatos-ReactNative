import React from "react"
import api from "../../api/axios"
import { useEffect } from "react"
import { Image, View, Text, ScrollView, Pressable } from "react-native"
import { useState } from "react"
import { styles } from "./styles"
import BotaoVoltar from "../../components/BotaoVoltar.js"
import A11y from "../../providers/A11y.js"



/* - COPIAR ISSO PARA USAR A FONT PERSONALIZADA - */

import * as Font from 'expo-font';
import fontLemonada from "../../assets/fonts/lemonada.ttf"


function TelaComanda() {


    const [comandas, setComandas] = useState([])
    const [fontLoaded, setFontLoaded] = useState(false);


    useEffect(() => {
        async function carregaComandas() {
            //Puxar do backend
            let listaComandas = [
                {
                    id: 1,
                    isReserva: false,
                    nomePrato: "Bife a cavalo",
                    observacoes: "Bem paçado!"
                },
                {
                id: 2,
                nomePrato: "Frango à Parmegiana",
                isReserva: false,
                    observacoes: "Sem espaguete"
                },
                {
                    nomePrato: "Frango à Parmegiana",
                    observacoes: null
                },
                {
                    nomePrato: "Frango à Parmegiana",
                    observacoes: null
                },
                {
                    nomePrato: "Frango à Parmegiana",
                    observacoes: null
                },
                {
                    nomePrato: "Frango à Parmegiana",
                    observacoes: null
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

    async function adicionarMesa() {
        await api.post("/restaurantes/mesas/addMesa", {})
            .then(response => {
                const resultado = response.data
            })
            .catch(error => {
                console.log(`Erro ao criar nova mesa: ${error.message}`)
            })
    }


    return (
        <View style={styles.containerEditarMesa}>
            <BotaoVoltar />
            <Text style={styles.titleMesas}>Mesas:</Text>
            <ScrollView style={styles.boxMesas}>
                <View style={{ alignItems: "center", gap: 30 }}>
                    {mesas.length > 0 ? (
                        mesas.map((obj, key) => (
                            <ItemMesa key={key} tipoMenu={2} obj={obj} />
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