import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";

function ItemMesa({index, idMesa, identificacaoMesa, ocupada}) {
    const [codigoMesa, setCodigoMesa] = useState("")
    return (
        <View key={index}>
            <Text>{identificacaoMesa}</Text>
            {ocupada ? (
                <View>
                    <Pressable accessibilityRole="button" onPress={async () => {
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
                    <Pressable accessibilityRole="button" onPress={async () => {
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
                    <Pressable accessibilityRole="button">
                        <Text>Ocupar mesa com código de reserva</Text>
                    </Pressable>
                    <TextInput placeholder="Digite o código da reserva" value={codigoMesa} onChangeText={setCodigoMesa} accessibilityLabel="Digite o código da mesa" />
                </View>
            )}
        </View>
    )
}

export default ItemMesa