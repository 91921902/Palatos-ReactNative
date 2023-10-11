import React from "react";
import { useState } from "react";
import { Text, View } from "react-native";

function formataTempo(numeroEmSegundos) {
    let horas = numeroEmSegundos / 3600
    numeroEmSegundos %= 3600
    let minutos = numeroEmSegundos / 60
    numeroEmSegundos %= 60
    const formatarNumero = (num) => (num < 10? `0${parseInt(num)}`: parseInt(num))
    return `${formatarNumero(horas)}:${formatarNumero(minutos)}:${formatarNumero(numeroEmSegundos)}`
}

function Comanda({ obj }) {
    const [tempoAtiva, setTempoAtiva] = useState("")
    {
        setInterval(() => {
            let dataAtual = new Date().getTime() / 1000
            let tempo = (dataAtual - obj.tempoAtiva)
            setTempoAtiva(formataTempo(tempo))
        }, 1000)
    }
    return (
        <View>
            {
                !obj.isReserva ? (
                    <Text>Mesa do restaurante</Text>
                ) : (
                    <Text>Mesa da reserva
                        {!obj.chegou && " - Ainda não chegou"}
                    </Text>
                )
            }
            <Text>{obj.nomePrato}</Text>
            <Text>
                {obj.observacoes ? `Observações: ${obj.observacoes}` : `Nenhuma observação disponível`}
            </Text>
            <Text>Mesa número {obj.numeroMesa}</Text>
            {tempoAtiva != "" && (
                <Text>Comanda ativa há {tempoAtiva}</Text>
            )}
        </View>
    )
}


export default Comanda