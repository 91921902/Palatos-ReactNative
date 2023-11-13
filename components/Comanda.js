import React, { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, Image } from "react-native";
import { Text, View, Pressable } from "react-native";
import { Icon } from "react-native-elements";
import A11y from "../providers/A11y.js"
import { useFormTools } from "../providers/FormRestContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../providers/api.js";

function formataTempo(numeroEmSegundos) {
    let horas = numeroEmSegundos / 3600
    numeroEmSegundos %= 3600
    let minutos = numeroEmSegundos / 60
    numeroEmSegundos %= 60
    const formatarNumero = (num) => (num < 10 ? `0${parseInt(num)}` : parseInt(num))
    return `${formatarNumero(horas)}:${formatarNumero(minutos)}:${formatarNumero(numeroEmSegundos)}`
}

function Comanda({ obj }) {
    const [tempoAtiva, setTempoAtiva] = useState("")

    useEffect(() => {
        if (!obj.is_reserva) {
            setInterval(() => {
                let dataAtual = new Date()
                let dataPedido = new Date(obj.data_entrada)
                let tempo = Math.floor((dataAtual - dataPedido) / 1000)
                setTempoAtiva(formataTempo(tempo))
            }, 1000)

        } else {

            let dataReserva = new Date(obj.data_entrada)
            setTempoAtiva(`Reserva programada para ${dataReserva.getHours()}:${dataReserva.getMinutes()}`)

        }

    }, [])

    const { comandaTools } = useFormTools()

    async function deletaComanda() {
        //const token = await AsyncStorage.getItem("token")
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpZFJlc3RhdXJhbnRlIjoyLCJpYXQiOjE2OTkzNzc3MDEsImV4cCI6MjMwNDE3NzcwMX0.6zUFwtaQfXUlxX_o_OSnDzfq5yawuf4Qd2mAv_Lbqmw"

        try {
            const result = await api.delete(`/restaurante/comandas/delete/${obj.id}`, {
                headers: {
                    Authorization: token
                }
            })
            comandaTools.deleta(obj.id)
        } catch (err) {
            console.log(`Erro ao deletar comanda: ${err}`)
        }
    }


    return (
        <View style={styles.comandaContainer}>
            <Pressable style={styles.btnDelete} {...A11y.role("button")} {...A11y.label("Excluir mesa do restaurante")}
                onPress={deletaComanda}>
                <Icon name="delete" color={"white"} type='antdesign' />
            </Pressable>
            {
                !obj.is_reserva ? (
                    <Text style={styles.textMesa}>Mesa do restaurante</Text>
                ) : (
                    <Text style={styles.textMesa}>Mesa da reserva</Text>
                )
            }
            <View style={styles.containerInfos}>
                <View style={{ width: "100%", flexDirection: "row" }}>
                    <Text style={styles.textInfo}>Número da mesa:</Text>
                    <Text
                        style={[
                            styles.infos,
                            !obj.is_reserva && { fontSize: 20, marginTop: -8 },
                            obj.is_reserva && obj.chegou && { fontSize: 20, marginTop: -8 },
                            obj.is_reserva && !obj.chegou && { color: "red", paddingLeft: 0, paddingTop: 3 }
                        ]}
                    >
                        {!obj.chegou && obj.is_reserva ? "Não chegou" : obj.numeroMesa}</Text>
                </View>

                <View style={{ width: "100%", height: 2, backgroundColor: "#B7A187", marginBottom: 5, marginTop: 5 }} />

                <View style={{ width: "100%" }}>
                    <Text style={styles.textInfo}>Pedido: </Text>
                    {obj.ProdutoComandas.map((objProduto) => (
                        <View key={objProduto.id}>
                            <Text>{objProduto.nome_produto}</Text>
                            <Text>
                                {objProduto.observacoes != "" ? (
                                    objProduto.observacoes
                                ) : (
                                    "Nenhuma observação disponível"
                                )}
                            </Text>
                        </View>
                    ))}
                    {/* <Text style={styles.infos}>{obj.nomePrato}</Text> */}
                </View>

                <View style={{ width: "100%", height: 2, backgroundColor: "#B7A187", marginBottom: 5, marginTop: 5 }} />

                <View style={{ width: "100%" }}>
                    {/* <Text style={styles.textInfo}>{obj.observacoes ? `Observações:` : `Nenhuma observação disponível`}</Text> */}
                    {/* <Text style={[styles.infos, { textAlign: "left" }]}>{obj.observacoes}</Text> */}
                </View>
            </View>
            <View style={styles.fullTimer}>
                <Text style={{ fontSize: 15, fontFamily: "kavoon", color: "#445A14" }}>
                    {!obj.is_reserva ? (
                        `Comanda ativa à ${tempoAtiva}`
                    ) : (
                        tempoAtiva
                    )}
                </Text>
            </View>
            <Image source={require("../assets/icons/comanda.png")} style={styles.icon} />
        </View>
    )
}

const styles = StyleSheet.create({
    comandaContainer: {
        width: '80%',
        minHeight: 300,
        borderWidth: 3,
        borderColor: "#B7A187",
        borderRadius: 3,
        paddingBottom: 80,
        position: "relative"
    },
    icon: {
        width: 60,
        height: 60,
        position: "absolute",
        bottom: 10,
        left: 10
    },
    textMesa: {
        textAlign: 'center',
        marginBottom: 5,
        marginTop: 5,
        fontSize: 16,
        fontFamily: "lemonada",
        color: "#445A14"
    },
    containerInfos: {
        marginTop: 10,
        width: "100%"
    },
    textInfo: {
        marginBottom: 5,
        fontSize: 18,
        fontFamily: "kavoon",
        color: "#445A14",
        paddingLeft: 15
    },
    infos: {
        fontSize: 13,
        fontFamily: "lemonada",
        color: "#445A14",
        paddingLeft: 15,
    },
    timer: {
        width: 100,
        height: 45,
        borderWidth: 3,
        borderColor: "#445A14",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 3
    },
    textTimer: {
        fontSize: 16,
        fontFamily: "lemonada",
        color: "#445A14"
    },
    fullTimer: {
        alignItems: "center",
        position: "absolute",
        bottom: 10,
        right: 10
    },
    btnDelete: {
        width: 45,
        height: 45,
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        right: -20,
        top: -20,
        borderRadius: 500
    }
})


export default Comanda