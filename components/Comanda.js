import React from "react";
import { useState } from "react";
import { Text, View } from "react-native";

function Comanda({ obj }) {
    return (
        <View>
            {
                !obj.isReserva ? (
                    <Text>Mesa do restaurante</Text>
                ) : (
                    <Text>Mesa da reserva
                        {!obj.chegou && " - Ainda não chegou" }
                    </Text>
            )
                    }
                    <Text>{obj.nomePrato}</Text>
                    <Text>
                        {obj.observacoes? `Observações: ${obj.observacoes}`: `Nenhuma observação disponível`}
                    </Text>
        </View>
    )
}


export default Comanda