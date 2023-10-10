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
                    chegou: false,
                    tempoAtiva: 60,
                    nomePrato: "Bife a cavalo",
                    observacoes: "Bem paçado!"
                },
                {
                    id: 2,
                    nomePrato: "Frango à Parmegiana",
                    isReserva: false,
                    chegou: false,
                    tempoAtiva: 60,
                    observacoes: "Sem espaguete"
                },
                {
                    id: 3,
                    nomePrato: "Frango à Parmegiana",
                    isReserva: true,
                    chegou: false,
                    tempoAtiva: 3800,
                    observacoes: null
                },
                {
                    id: 4,
                    nomePrato: "Feijoada",
                    isReserva: true,
                    chegou: true,
                    tempoAtiva: 3600,
                    observacoes: "Sem couve e laranja"
                },
                {
                    id: 5,
                    nomePrato: "Tutu à Mineira",
                    isReserva: false,
                    chegou: true,
                    tempoAtiva: 77,
                    observacoes: "Sem couve, por favor"
                },
                {
                    id: 6,
                    nomePrato: "Pavê",
                    isReserva: true,
                    chegou: false,
                    tempoAtiva: 60,
                    observacoes: null
                },
            ]
            setComandas(listaComandas)
        }

        async function loadFonts() {
            await Font.loadAsync({
                'lemonada': fontLemonada,
            });
            setFontLoaded(true);
        }

        loadFonts();
        carregaComandas()
    }, []);

    if (!fontLoaded) {
        return null;
    }


    return (
        <View>
            <BotaoVoltar />
            <Text>Comandas:</Text>
            <ScrollView>
                <View style={{ alignItems: "center", gap: 30 }}>
                    {comandas.length > 0 && (
                        comandas.map((obj, key) => (
                            <Comanda key={key} obj={obj} />
                        ))
                    )}
                </View>
            </ScrollView >

        </View >
    );

}

export default TelaComanda