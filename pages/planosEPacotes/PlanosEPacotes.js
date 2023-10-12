import React from "react"
import api from "../../api/axios"
import { useEffect } from "react"
import { Image, View, Text, Pressable } from "react-native"
import { useState } from "react"
import { styles } from "./styles"
import BotaoVoltar from "../../components/BotaoVoltar.js"
import A11y from "../../providers/A11y.js"
import * as Font from 'expo-font';
import fontLemonada from "../../assets/fonts/lemonada.ttf"

function PlanosEPacotes() {
    const [fontLoaded, setFontLoaded] = useState(false);
    const [planos, setPlanos] = useState([])

    useEffect(() => {
        async function carregaPlanos() {
            //Puxar do back
            let listaPlanos = [
                {
                    nome: "Básico",
                    preco: 10.00,
                    descricao: "Permite o cadastro de 5 cardápios e um restaurante"
                }, {
                    nome: "Avançado",
                    preco: 20.00,
                    descricao: "Permite o cadastro de 10 cardápios e três restaurantes"
                }, {
                    nome: "Premium",
                    preco: 30.00,
                    descricao: "Permite o cadastro de 20 cardápios e 5 restaurantes"
                }
            ]
            setPlanos(listaPlanos)
        }

        async function loadFonts() {
            await Font.loadAsync({
                'lemonada': fontLemonada,
            });
            setFontLoaded(true);
        }

        loadFonts();
        carregaPlanos()

    }, [])

async function contratar() {
    try {
        const resultado = await api.get(`/planos/contratar/${obj.id}`)
        const json = resultado.data
    } catch(err) {
        console.log(`Erro ao realizar contratação de plano: ${err}`)
    }
}


    if (!fontLoaded) return null

    return (
        <View style={styles.containerPlanosEPacotes}>
            <View>
                <Text>Planos e pacotes</Text>
            </View>
            <View style={styles.body}>
                {
                    planos.length > 0 && (
                        planos.map((obj, index) => (
                            <View>
                                <Text>Plano {obj.nome}</Text>
                                <Text>{obj.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</Text>
                                <Text>{obj.descricao}</Text>
                                <Pressable onPress={contratar} {...A11y.role("button")}>
                                    <Text>Contratar</Text>
                                </Pressable>
                            </View>
                        ))
                    )
                }
            </View>
        </View>
    );

}

export default PlanosEPacotes