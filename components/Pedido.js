import React from "react"
import { View, Text, StyleSheet } from "react-native"

function Pedido({objProduto}) {

    const {nome_produto, observacoes} = objProduto

    return(
        <View style={styles.containerPedido}>

            <View style={styles.boxNomeProduto}>
                <Text style={styles.textHeader}>Nome: </Text>
                <Text style={styles.textNomeProduto}>{nome_produto}</Text>
            </View>

            <View>
                <Text style={[styles.textHeader, {fontSize: 16}]}>Observação</Text>

                <Text style={styles.textObservacao}>
                    {observacoes != "" ? (
                        observacoes
                    ) : (
                        "Nenhuma observação disponível"
                    )}
                </Text>
            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    containerPedido: {
        padding: 5,
        borderBottomWidth: 2,
        borderBottomColor: "#B7A187"
    },
    boxNomeProduto: {
        flexDirection: "row",
        marginBottom: 5,
        alignItems: "center"
    },
    textHeader: {
        fontFamily: "kavoon",
        color: "#445A14"
    },
    textNomeProduto: {
        fontFamily: "lemonada",
        paddingLeft: 5

    },
    textObservacao: {
        fontFamily: "lemonada"
    }
})

export default Pedido