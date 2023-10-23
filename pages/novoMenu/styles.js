import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerNovoMenu: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        width: "100%",
        height: "100%",
        paddingTop: 90
    },
    boxQuantMesas: {
        width: "100%",
        height: "25%",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 20
    },
    inputQuantMesas: {
        width: 100,
        height: 40,
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#445A14",
        borderRadius: 15,
        fontSize: 12,
        fontFamily: "lemonada",
        textAlign: "center",
    },
    textQuantMesas: {
        fontSize: 15,
        fontFamily: "kavoon",
        width: "100%",
        textAlign: "center",
        color: "#445A14"
    },
    titleMenu: {
        width: "100%",
        height: "15%",
        alignItems: "center",
        justifyContent: "center",
    },
    textTitleMenu: {
        fontSize: 25,
        fontFamily: "kavoon",
        width: "100%",
        textAlign: "center",
        color: "#445A14"
    },
    menuItens: {
        alignItems: "center",
        gap: 20,
        paddingBottom: 20,
        paddingBottom: 110
    },
    boxFinalizarMenu: {
        width: "100%",
        height: "10%",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: 15
    },
    btnFinalizarMenu: {
        width: 140,
        height: 50,
        backgroundColor: "#D1C0AB",
        borderRadius: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    textFinalizarMenu: {
        fontSize: 15,
        fontFamily: "kavoon",
        width: "100%",
        textAlign: "center",
        color: "#445A14"
    },
    
})