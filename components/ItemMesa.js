import React, { useEffect, useState } from "react";
import { View, Text, Pressable, TextInput, Image, StyleSheet } from "react-native";
import api from "../api/axios";
import * as Font from 'expo-font';
import fontLemonada from "../assets/fonts/lemonada.ttf"
import fontKavoon from "../assets/fonts/kavoon.ttf"
import { Icon } from "react-native-elements";
import A11y from "../providers/A11y.js"
import { useFormTools } from "../providers/FormRestContext.js"
import QRCode from "react-native-qrcode-svg";

function ItemMesa({ index, tipoMenu, obj }) {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzLCJpZFJlc3RhdXJhbnRlIjo5LCJpYXQiOjE3MDA2MjM2MTMsImV4cCI6MjMwNTQyMzYxM30.U8MdfPqaAEwpkvwyut-U10cyB-eyVmYroC_twysSMu4"
    const [codigoMesa, setCodigoMesa] = useState("");
    const [campoCodigoVisivel, setCampoCodigoVisivel] = useState(false);
    const { mesaTools, mesas } = useFormTools()
    const [fontLoaded, setFontLoaded] = useState(false);
    const [heightItem, setHeightItem] = useState(180)


    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                'lemonada': fontLemonada,
                'kavoon': fontKavoon
            });
            setFontLoaded(true);
        }

        loadFonts();
    }, [])

    if (!fontLoaded) {
        return null;
    }

    async function liberarMesa() {
        try {
            const response = await api.put(`/restaurante/mesa/toggleOccupied/${obj.id}`, {
                isOccupied: false
            }, {
                headers: {
                    Authorization: token
                }
            })
            mesaTools.modificaMesa(obj.id, false)
        } catch (err) {
            console.log(`Erro ao atualizar mesa: ${err}`);
        }
    }

    async function deletarMesa() {
        const resultado = await api.delete(`/restaurantes/mesas/delete/${obj.idMesa}`);
    }

    async function ocuparMesa() {
        try {
            const response = await api.put(`/restaurante/mesa/toggleOccupied/${obj.id}`, {
                isOccupied: true
            }, {
                headers: {
                    Authorization: token
                }
            })
            mesaTools.modificaMesa(obj.id, true)
        } catch (err) {
            console.log(`Erro ao atualizar mesa: ${err}`);
        }
    }

    async function mudarStatusComCodigo() {
        setCampoCodigoVisivel(false)
        setCodigoMesa("")
        const resultado = await api.put(`restaurante/reserva/completed/${codigoMesa}/${obj.id}`, {}, {
            headers: {
                Authorization: token
            }
        });
        if (resultado.status == 200) {

            mesaTools.modificaMesa(obj.id, true)
        } else {

            console.log(`Erro ao liberar mesa com código da reserva: ${resultado.data ? resultado.data : resultado.status}`);
        }
    }

    return (
        <View style={[styles.itemMesa, { height: heightItem }]}>
            <View style={styles.boxIdMesa}>
                <Text style={styles.textIdMesa}>{obj.identificacao_mesa || "Identificação não disponível"}</Text>
            </View>

            {tipoMenu == 1 ? (
                <>
                    <View style={styles.boxBtns}>
                        <View style={styles.boxButton}>
                            <Pressable role="button"
                            onPress={liberarMesa}
                            disabled={!obj.ocupada}
                            style={[styles.tableButton, { backgroundColor: "#7AEB71" }]} {...A11y.label("Liberar mesa")}>
                                <Image source={require("../assets/icons/liberar.png")} style={styles.imgBtnTable} />
                            </Pressable>
                            <Text style={{ fontFamily: "lemonada", fontSize: 12, color: "#445A14" }} aria-hidden>Liberar mesa</Text>
                        </View>

                        <View style={styles.boxButton}>
                            <Pressable role="button"
                            onPress={ocuparMesa}
                            disabled={obj.ocupada}
                            style={[styles.tableButton, { backgroundColor: "#EB3333" }]} {...A11y.label("Ocupar mesa")}>
                                <Image source={require("../assets/icons/ocupar.png")} style={styles.imgBtnTable} />
                            </Pressable>
                            <Text style={{ fontFamily: "lemonada", fontSize: 12, color: "#445A14" }} aria-hidden>Ocupar mesa</Text>
                        </View>

                        <View style={styles.boxButton}>
                            <Pressable role="button" {...A11y.label("Reserva")}
                                disabled={obj.ocupada}
                                style={[styles.tableButton, {
                                    backgroundColor
                                        : "#276BEF"
                                }]} accessibilityHint="Mostra ou oculta campo para digitar o código de reserva da mesa" onPress={() => {
                                    setCampoCodigoVisivel(!campoCodigoVisivel);
                                    !campoCodigoVisivel ? (setHeightItem(280)) : (setHeightItem(180))

                                }}>
                                <Image source={require("../assets/icons/reserva.png")} style={styles.imgBtnTable} />
                            </Pressable>
                            <Text style={{ fontFamily: "lemonada", fontSize: 12, color: "#445A14" }} aria-hidden>Reserva</Text>
                        </View>
                    </View>
                    <View style={styles.boxCompoReserva}>

                        {campoCodigoVisivel ? (
                            <View style={styles.boxInpt}>
                                <Text style={styles.textConfirmCod}>Confirmar Código:</Text>
                                <View style={{ flexDirection: "row", width: "100%", gap: 10, alignItems: "center" }}>
                                    <TextInput
                                        style={styles.inptCod}
                                        value={codigoMesa}
                                        onChangeText={setCodigoMesa}
                                        cursorColor={"#7AEB71"}
                                        {...A11y.label("Digite o código da reserva")}
                                        returnKeyType="send"
                                        onSubmitEditing={mudarStatusComCodigo}
                                    />
                                    <Pressable style={styles.btnConfirm} role="button"
                                        onPress={mudarStatusComCodigo}>
                                        <Text style={{ fontFamily: "kavoon", color: "#445A14" }}>OK</Text>
                                    </Pressable>
                                </View>
                            </View>
                        ) : (null)}

                    </View>
                </>
            ) : (
                <View>
                    <Pressable style={styles.btnDelete} role="button" onPress={deletarMesa} {...A11y.label("Excluir mesa do restaurante")}>
                        <Icon name="delete" color={"white"} />
                    </Pressable>
                    <QRCode value={obj.qr_code} accessibilityLabel={"Eita"}/>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    itemMesa: {
        width: "90%",
        borderRadius: 25,
        borderColor: "#B7A187",
        borderWidth: 4,

    },
    boxIdMesa: {
        width: "100%",
        height: "30%",
        justifyContent: "center",
        paddingLeft: 20,
    },
    textIdMesa: {
        fontSize: 22,
        fontFamily: "kavoon",
        color: "#445A14"
    },
    boxBtns: {
        flexDirection: "row",
        alignItems: "center",
        height: "50%",
        justifyContent: "space-between"
    },
    boxButton: {
        alignItems: "center",
        height: "100%",
        width: "33.3%",
    },
    tableButton: {
        width: 65,
        height: 65,
        backgroundColor: "blue",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    boxCompoReserva: {
        width: "100%",
        height: "20%",
        paddingLeft: 20,
        justifyContent: "center",
    },
    boxInpt: {
        marginBottom: 80,
        gap: 10,
        height: "100%",
        width: "100%"
    },
    textConfirmCod: {
        fontSize: 18,
        fontFamily: "kavoon",
        color: "#445A14"
    },
    inptCod: {
        width: "70%",
        borderWidth: 2,
        borderColor: "#445A14",
        borderRadius: 7,
        padding: 2,
        paddingLeft: 10,
        color: "#445A14",
        fontFamily: "lemonada",
        fontSize: 13,
        height: 40
    },
    btnConfirm: {
        width: 50,
        height: 40,
        borderColor: "#445A14",
        borderWidth: 2,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    imgBtnTable: {
        width: 45,
        height: 45
    },
    btnDelete: {
        width: 40,
        height: 40,
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        right: 15,
        top: -35,
        borderRadius: 500
    }
})

export default ItemMesa;
