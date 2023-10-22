import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        alignItems: "center",
        paddingTop: 80
    },
    title: {
        fontFamily: "kavoon",
        fontSize: 35,
        color: "#445A14",
        marginBottom: 30
    },
    boxReserva: {
        width: "90%",
        minHeight: 300,
        borderWidth: 3,
        borderColor: "#B7A187",
        borderRadius: 5,
        gap: 15,
        paddingTop: 15,
        paddingBottom: 70
    },
    containerReserva: {
        alignItems: "center",
        width: "100%",
        gap: 30
    },
    boxInfo: {
        flexDirection: "row",
        paddingLeft: 20,
        alignItems: "center",
    },
    textInfo: {
        fontSize: 18,
        fontFamily: "kavoon",
        color: "#445A14"
    },
    info: {
        fontSize: 13,
        fontFamily: "lemonada",
        marginTop: 5,
        paddingBottom: 3
    },
    iconReserva: {
        width:70,
        height: 70,
        position: "absolute",
        bottom: 0,
        right: 15,
        resizeMode: "contain"
    }
})