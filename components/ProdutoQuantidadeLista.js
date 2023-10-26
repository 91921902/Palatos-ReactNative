import { View, StyleSheet, Text } from "react-native";


export default function ProdutoQuantidadeLista({item}) {

    return(
        <View style={styles.boxItem}>
            <View style={[styles.subContainer, {borderRightWidth: 1}]}>
                <Text style={styles.textItem}>
                    {item.nome}
                </Text>
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.textItem}>
                    {item.quantidade}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    boxItem: {
        flexDirection: 'row',
        width: "100%",
        height: 40,
        borderBottomWidth: 1,
        borderColor: "#445A14"
    },
    subContainer: {
        width: "50%",
        minHeight: 40,
        alignItems: "center",
        justifyContent: "center"
    },
    textItem: {
        fontFamily: "lemonada",
        fontSize: 12,
        color: "#445A14"
    }
})