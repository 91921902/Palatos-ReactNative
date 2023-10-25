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


function TelaComanda({navigation}) {


    const [comandas, setComandas] = useState([])
    const [fontLoaded, setFontLoaded] = useState(false);


    useEffect(() => {
        async function carregaComandas() {
            //Puxar do backend
            let tempoAtual = new Date().getTime()/1000
            let listaComandas = [
                {
                    id: 1,
                    isReserva: false,
                    chegou: false,
                    tempoAtiva: (tempoAtual-60),
                    nomePrato: "Bife a cavalo",
                    numeroMesa: 1,
                    observacoes: "Bem paçado!"
                },
                {
                    id: 2,
                    nomePrato: "Frango à Parmegiana",
                    isReserva: false,
                    chegou: false,
                    tempoAtiva: (tempoAtual-60),
                    numeroMesa: 2,
                    observacoes: "Sem espaguete"
                },
                {
                    id: 3,
                    nomePrato: "Frango à Parmegiana",
                    isReserva: true,
                    chegou: false,
                    tempoAtiva: (tempoAtual-3800),
                    numeroMesa: 4,
                    observacoes: null
                },
                {
                    id: 4,
                    nomePrato: "Feijoada",
                    isReserva: true,
                    chegou: true,
                    tempoAtiva: (tempoAtual-3600),
                    numeroMesa: 5,
                    observacoes: "Sem couve e laranja"
                },
                {
                    id: 5,
                    nomePrato: "Tutu à Mineira",
                    isReserva: false,
                    chegou: true,
                    tempoAtiva: (tempoAtual-77),
                    numeroMesa: 3,
                    observacoes: "Sem couve, por favor"
                },
                {
                    id: 6,
                    nomePrato: "Pavê",
                    isReserva: true,
                    chegou: false,
                    tempoAtiva: (tempoAtual-60),
                    numeroMesa: 6,
                    observacoes: null
                },
            ]

            //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpZFJlc3RhdXJhbnRlIjo0MywiaWF0IjoxNjk3NDE0MTQ2LCJleHAiOjIzMDIyMTQxNDZ9.drK4rr_L4ATnS5CXolmnhjjSCNh3U5N17CaP78mJCpM"
            //let listaComandas = []

            // try {
            //     const result = await api.get("/restaurante/comandas", {
            //         headers: {
            //             Authorization: token
            //         }
            //     })
            //     console.log(result)
            //     listaComandas = result.data.ListaComandas
            // } catch(err) {
            //     console.log(`Erro ao puxar comandas: ${err}`)
            // }
            // console.log(listaComandas)
            setComandas(listaComandas)
        }

        async function loadFonts() {
            await Font.loadAsync({
                'lemonada': fontLemonada,
                'kavoon':fontKavoon
            });
            setFontLoaded(true);
        }

        loadFonts();
        carregaComandas()
    }, []);

    if (!fontLoaded) {
        return null;
    }

    function backPage() {

        navigation.goBack()

    }

    return (
        <View style={styles.container}>
            <BotaoVoltar onPress={backPage}/>
            <Text style={styles.title}>Comandas:</Text>
            <ScrollView contentContainerStyle={{width: "100%"}}>
                <View style={styles.comandas}>
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