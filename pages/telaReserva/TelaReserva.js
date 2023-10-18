import React from "react";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";

function TelaReserva() {
    const [reservas, setReservas] = useState([])


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
                        "Bolo de chocolate com brigadeiro"
                    ]
                },
            ]
            setReservas(listaReservas)

        }

        carregaReservas()
    }, [])
    return (
        <View>
            {reservas.length > 0 && (
                reservas.map((obj, index) => (
                    <View>
                        <Text>Nome: {obj.nome}</Text>
                        <Text>Código da reserva: {obj.codigoReserva}</Text>
                        <Text>Horário: {obj.horario}</Text>
                        {
                            obj.pedido.map((itemPedido) => (
                                <Text>{itemPedido}</Text>
                            ))
                
                        }
                    </View>
                )
                )
            )
            }
        </View>
    )
}

export default TelaReserva