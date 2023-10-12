import React, { useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles"

function PlanosEPacotes() {

    //Puxar do back
    let listaPlanos = [
        {
            nome: "Básico",
            preco: 10.00,
            descricao: "Permite o cadastro de 5 cardápios e um restaurante"
        }, {
            nome: "Avançado",
            preco: 20.00,
            descricao: "Permite o cadastro de 10 cardápios e três restaurantes"
        }, {
            nome: "Premium",
            preco: 30.00,
            descricao: "Permite o cadastro de 20 cardápios e 5 restaurantes"
        }
    ]

    const [planos, setPlanos] = useState(listaPlanos)
    return (
        <View style={styles.containerPlanosEPacotes}>
            <View>
                <Text>Planos e pacotes</Text>
            </View>
            <View style={styles.body}>
                {
                    planos.length > 0 && (
                        planos.map((obj, index) => (
                            <View>
                                <Text>Plano {obj.nome}</Text>
                                <Text>{obj.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</Text>
                                <Text>{obj.descricao}</Text>
                            </View>
                        ))
                    )
                }
            </View>
        </View>
    );

}

export default PlanosEPacotes