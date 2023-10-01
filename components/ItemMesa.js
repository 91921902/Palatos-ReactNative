import React, { useState } from "react";
import { View, Text, Pressable, TextInput, Image } from "react-native";
import api from "../api/axios";

function ItemMesa({ index, tipoMenu, obj }) {
    const [codigoMesa, setCodigoMesa] = useState("");
    const [campoCodigoVisivel, setCampoCodigoVisivel] = useState(false);
    return (
        <View>
            <Text>{obj.identificacao_mesa}</Text>
            {tipoMenu == 1 ? (
                obj.ocupada ? (
                    <View>
                        <Pressable role="button" onPress={async () => {
                            try {
                                const response = await api.patch(`/restaurantes/mesas/mudarStatus`, {
                                    id: obj.idMesa,
                                    ocupada: false
                                });
                            } catch (err) {
                                console.log(`Erro ao atualizar mesa: ${err}`);
                            }
                        }}>
                            <Text>Liberar mesa</Text>
                        </Pressable>
                    </View>
                ) : (
                    <View>
                        <Pressable role="button" onPress={async () => {
                            try {
                                const response = await api.patch(`/restaurantes/mesas/mudarStatus`, {
                                    id: obj.idMesa,
                                    ocupada: true
                                });
                            } catch (err) {
                                console.log(`Erro ao atualizar mesa: ${err}`);
                            }
                        }}>
                            <Text>Ocupar mesa</Text>
                        </Pressable>
                        <Pressable role="button" accessibilityHint="Mostra ou oculta campo para digitar o código de reserva da mesa" onPress={() => {
                            setCampoCodigoVisivel(!campoCodigoVisivel);
                        }}>
                            <Text>Ocupar mesa com código de reserva</Text>
                        </Pressable>
                        {campoCodigoVisivel ? (
                            <TextInput
                                placeholder="Digite o código da reserva"
                                value={codigoMesa}
                                onChangeText={setCodigoMesa}
                                accessibilityLabel="Digite o código da mesa"
                                returnKeyType="send"
                                onSubmitEditing={async () => {
                                    try {
                                        const resultado = await api.patch("/restaurantes/mesa/mudarStatus", {
                                            id: obj.idMesa,
                                            codigoMesa: obj.codigoMesa
                                        });
                                        const json = await resultado.json();
                                    } catch (err) {
                                        console.log(`Erro ao liberar mesa com código da reserva: ${err}`);
                                    }
                                }}
                            />
                        ) : (null)}
                    </View>
                )
            ) : (
                <View>
                    <Pressable role="button" onPress={async () => {
                        const resultado = await api.delete(`/restaurantes/mesas/delete/${obj.idMesa}`);
                    }}>
                        <Text>Excluir mesa do restaurante</Text>
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

export default ItemMesa;
