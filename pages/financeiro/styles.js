import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerFinanceiro: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        paddingTop: 70
    },
    title: {
        fontSize: 30,
        color: "#445A14",
        fontFamily: "kavoon"
    },
    subContainers: {
        width: "100%",
        height: "50%",
        alignItems: "center",
    },
    btnEspecificacoes: {
        width: "80%",
        height: 55,
        backgroundColor: "#D1C0AB",
        alignItems: "center",
        justifyContent: "center"
    },
    textBtns: {
        fontSize: 18,
        fontFamily: "lemonada",
        color: "#445A14"
    },
    boxGuia: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    quadradinhoCor: {
        width: 10,
        height: 10,
        borderWidth: 1,
        borderColor: "black",
        marginLeft: 10,
        borderRadius: 2
    },
    textGuia: {
        fontFamily: "lemonada",
        color: "#445A14",
        fontSize: 10
    }
})