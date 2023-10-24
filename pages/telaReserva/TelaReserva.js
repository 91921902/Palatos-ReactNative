import React from "react";
import { useEffect, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { styles } from "./styles";
import BotaoVoltar from "../../components/BotaoVoltar";

import * as Font from 'expo-font';
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import fontKavoon from "../../assets/fonts/kavoon.ttf"


function TelaReserva({navigation}) {
    const [reservas, setReservas] = useState([])
    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        async function carregaReservas() {
            //Precisa puxar do backend

            //criando um objeto de data pra teste
            const dataAtual = new Date()

            const listaReservas = [
                {
                    nome: "João",
                    codigoReserva: 2524,
                    horario: dataAtual.getDate() + 1,
                    pedido: [
                        "Bife Acebolado",
                        "Doce de leite"
                    ]
                },
                {
                    nome: "David",
                    codigoReserva: 3844,
                    horario: dataAtual.getHours() + 2,
                    pedido: [
                        "Feijoada",
                        "Mousse de Maracujá"
                    ]
                },
                {
                    nome: "Eduarda",
                    codigoReserva: 6499,
                    horario: dataAtual.getDate() + 2,
                    pedido: [
                        "Macarrão",
                        "Bolo de chocolate com brigadeiro",
                        "camarao",
                        "lagosta",
                        "Macarrão",
                        "Bolo de chocolate com brigadeiro",
                        "camarao",
                        "lagosta",
                        "Macarrão",
                        "Bolo de chocolate com brigadeiro",
                        "camarao",
                        "lagosta",
                        "Macarrão",
                        "Bolo de chocolate com brigadeiro",
                        "camarao",
                        "lagosta",
                    ]
                },
            ]
            setReservas(listaReservas)
         
        }

        
        async function loadFonts() {
            await Font.loadAsync({
                'lemonada': fontLemonada,
                'kavoon':fontKavoon
            });
            setFontLoaded(true);
        }

        loadFonts();

        carregaReservas()
    }, [])

    if (!fontLoaded) {
        return
    }

    function backpage() {
        navigation.goBack()
    }
    

    return (
        <View style={styles.container}>
            <BotaoVoltar onPress={backpage}/>
            <Text style={styles.title}>Reservas:</Text>
            <ScrollView style={{width: "100%"}}>
                <View style={styles.containerReserva}>
                    {reservas.length > 0 && (
                        reservas.map((obj, index) => (
                            <View style={styles.boxReserva} key={obj.codigoReserva}>
                                <View style={styles.boxInfo}>
                                    <Text style={styles.textInfo}>Nome: </Text>
                                    <Text style={styles.info}>{obj.nome}</Text>
                                </View>
                                <View style={styles.boxInfo}>
                                    <Text style={styles.textInfo}>Código da reserva: </Text>
                                    <Text style={styles.info}>{obj.codigoReserva}</Text>
                                </View>
                                <View style={styles.boxInfo}>
                                    <Text style={styles.textInfo}>Horário: </Text>
                                    <Text style={styles.info}>{obj.horario}</Text>
                                </View>
                                <View style={[styles.boxInfo, {flexDirection: "column", alignItems: "flex-start", width: "100%", flex: 1}]}>
                                    <Text style={styles.textInfo}>Pedidos: </Text>
                                    <View style={{flexDirection: "row", width: "100%", flex: 1}}>
                                    <Text style={[styles.info, {marginBottom: 3}]}>
                                        {
                                            obj.pedido.map((itemPedido, index) => (
                                                <Text key={index}>
                                                    {itemPedido}
                                                    {
                                                        obj.pedido.length != (index + 1) ? ", " : "."
                                                    }
                                                </Text>
                                            ))
                                        }   
                                        </Text>
                                    </View>
                                </View>
                                
                                <Image source={require("../../assets/icons/reserva.png")} style={styles.iconReserva}/>
                                
                            </View>
                        ))
                    )
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default TelaReserva