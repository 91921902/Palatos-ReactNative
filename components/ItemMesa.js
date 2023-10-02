import React, { useEffect, useState } from "react";
import { View, Text, Pressable, TextInput, Image, StyleSheet } from "react-native";
import api from "../api/axios";
import * as Font from 'expo-font';
import fontLemonada from "../assets/fonts/lemonada.ttf"
import fontKavoon from "../assets/fonts/kavoon.ttf"

function ItemMesa({ index, tipoMenu, obj }) {
    const [codigoMesa, setCodigoMesa] = useState("");
    const [campoCodigoVisivel, setCampoCodigoVisivel] = useState(false);
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
            const response = await api.patch(`/restaurantes/mesas/mudarStatus`, {
                id: obj.id,
                ocupada: false
            });
        } catch (err) {
            console.log(`Erro ao atualizar mesa: ${err}`);
        }
    }

    async function deletarMesa() {
        const resultado = await api.delete(`/restaurantes/mesas/delete/${obj.idMesa}`);
    }

    async function ocuparMesa() {
        try {
            const response = await api.patch(`/restaurantes/mesas/mudarStatus`, {
                id: obj.id,
                ocupada: true
            });
        } catch (err) {
            console.log(`Erro ao atualizar mesa: ${err}`);
        }
    }

    async function mudarStatusComCodigo(){
        try {
            const resultado = await api.patch("/restaurantes/mesa/mudarStatus", {
                id: obj.id,
                codigoMesa: codigoMesa
            });
            const json = await resultado.json();
        } catch (err) {
            console.log(`Erro ao liberar mesa com código da reserva: ${err}`);
        }
    }

    return (
        <View style={[styles.itemMesa, {height: heightItem}]}>
            <View style={styles.boxIdMesa}>
                <Text style={styles.textIdMesa}>{obj.identificacao_mesa}</Text>
            </View>
            
            {tipoMenu == 1 ? (
                <>
                <View style={styles.boxBtns}>
                    <View style={styles.boxButton}> 
                        <Pressable role="button" onPress={liberarMesa} style={[styles.tableButton, {backgroundColor: "#7AEB71"}]} accessibilityLabel="Liberar mesa">
                            <Image source={require("../assets/icons/liberar.png")} style={styles.imgBtnTable}/>
                        </Pressable>
                        <Text style={{fontFamily: "lemonada", fontSize: 12, color: "#445A14"}} aria-hidden>Liberar mesa</Text>
                    </View>

                    <View style={styles.boxButton}>
                        <Pressable role="button" onPress={ocuparMesa} style={[styles.tableButton, {backgroundColor: "#EB3333"}]} accessibilityLabel="Ocupar mesa">
                        <Image source={require("../assets/icons/ocupar.png")} style={styles.imgBtnTable}/>
                        </Pressable>
                        <Text style={{fontFamily: "lemonada", fontSize: 12, color: "#445A14"}} aria-hidden>Ocupar mesa</Text>
                    </View>

                    <View style={styles.boxButton}>
                        <Pressable role="button" accessibilityLabel="Reserva" style={[styles.tableButton, {backgroundColor
                        : "#276BEF"}]} accessibilityHint="Mostra ou oculta campo para digitar o código de reserva da mesa" onPress={() => {
                                setCampoCodigoVisivel(!campoCodigoVisivel);
                                !campoCodigoVisivel ? (setHeightItem(280)) : (setHeightItem(180))
                                
                        }}>
                            <Image source={require("../assets/icons/reserva.png")} style={styles.imgBtnTable}/>
                        </Pressable>
                        <Text style={{fontFamily: "lemonada", fontSize: 12, color: "#445A14"}} aria-hidden>Reserva</Text>
                    </View>
                </View>
                <View style={styles.boxCompoReserva}>
                   
                        {campoCodigoVisivel ? (
                             <View style={styles.boxInpt}>
                                <Text style={styles.textConfirmCod}>Confirmar Código:</Text>
                                <View style={{flexDirection: "row", width: "100%", gap: 10, alignItems: "center"}}>
                                    <TextInput
                                        style={styles.inptCod}
                                        value={codigoMesa}
                                        onChangeText={setCodigoMesa}
                                        cursorColor={"#7AEB71"}
                                        accessibilityLabel="Digite o código da reserva"
                                        returnKeyType="send"
                                        onSubmitEditing={mudarStatusComCodigo}
                                    />
                                    <Pressable style={styles.btnConfirm} role="button">
                                        <Text style={{fontFamily: "kavoon", color: "#445A14"}}>OK</Text>
                                    </Pressable>
                                </View>
                            </View>
                        ) : (null)}
                    
                </View>
            </>
            ) : (
                <View>
                    <Pressable role="button" onPress={deletarMesa} accessibilityLabel="Excluir mesa do restaurante">
                        <Text aria-hidden>Excluir mesa do restaurante</Text>
                    </Pressable>
                    <Image source={{ uri: obj.qr_code }}
                        style={{ width: 100, height: 100, borderRadius: 10 }}
                        resizeMode="cover"
                        accessibilityLabel="Qr code da mesa"
                    />
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
        borderRadius:20,
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
    }
})

export default ItemMesa;
