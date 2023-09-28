import React, { useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import api from "../api/axios"

function ItemMesa({ index, idMesa, identificacaoMesa, ocupada }) {
    const [codigoMesa, setCodigoMesa] = useState("")
    const [campoCodigoVisivel, setCampoCodigoVisivel] = useState(false)
    return (
        <View key={index}>
            <Text>{identificacaoMesa}</Text>
            {ocupada ? (
                <View>
                    <Pressable role="button" onPress={async () => {
                        try {
                            const response = await api.patch(`/restaurantes/mesas/mudarStatus`, {
                                id: idMesa,
                                ocupada: false
                            })
                        } catch (err) {
                            console.log(`Erro ao atualizar mesa: ${err}`)
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
                                id: idMesa,
                                ocupada: true
                            })
                        } catch (err) {
                            console.log(`Erro ao atualizar mesa: ${err}`)
                        }
                    }}>
                        <Text>Ocupar mesa</Text>
                    </Pressable>
                    <Pressable role="button" onPress={async() => {
                        setCampoCodigoVisivel(!campoCodigoVisivel)
                    }}>
                        <Text>Ocupar mesa com código de reserva</Text>
                    </Pressable>
                    {campoCodigoVisivel?(
                    <TextInput placeholder="Digite o código da reserva" value={codigoMesa} onChangeText={setCodigoMesa} accessibilityLabel="Digite o código da mesa" returnKeyType="send" onSubmitEditing={async() =>{
                        try {
                            const resultado = await api.patch("/restaurantes/mesa/mudarStatus", {
                                idMesa,
                                codigoMesa
                            })
                            const json = await resultado.json()
                        } catch(err) {
                            console.log(`Erro ao liberar mesa com código da reserva: ${err}`)
                        }
                    }}/>
                    ):(null)}
                </View>
            )}
        </View>
    )
}

export default ItemMesa