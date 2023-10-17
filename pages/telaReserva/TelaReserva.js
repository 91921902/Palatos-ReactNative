import React from "react";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";

function TelaReserva() {
    const [reservas, setReservas] = useState([])


    useEffect(() => {
        async function carregaReservas() {
            {
                //Precisa puxar do backend

                //criando um objeto de data pra teste
                const dataAtual = new Date()

                const listaReservas = [
                    {
                        nome: "João",
                        codigoReserva: 2524,
                        horario: (dataAtual.getDate() + 1)
                }
                ]
            }
        }
    })
    return (

    )
}

export default TelaReserva