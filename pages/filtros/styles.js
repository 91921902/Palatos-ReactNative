import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerFiltros: {
        width: "100%",
        height: "100%",
        alignItems: "center"
    },
    boxFilter: {
        width: "100%",
        height: "40%",
        flexDirection: "row"
    },
    metadeFiltro: {
        width: "50%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
    },
    boxBtnFilter: {
        width: "80%",
        height: 150,
        backgroundColor: "#D1C0AB",
        marginTop: 5,
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    btnFilter: {
        width: "90%",
        height: 45,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 3
    },
    textBtnFilter: {
        fontSize: 12,
        color: "#445A14",
        fontFamily: "lemonada"
    },
    boxInptData: {
        width: "100%",
        height: "10%",
        alignItems: "center",
        justifyContent: "flex-end"
    },
    textInput: {
        width: 200,
        height: 50,
        borderWidth: 2,
        borderColor: "#445A14",
        borderRadius: 15,
        fontSize: 11,
        textAlign: "center",
        fontFamily: "lemonada"
    },

    boxList: {
        width: "90%",
        minHeight: "48%",
        marginTop: "2%",
        borderWidth: 2,
        borderColor: "#B7A187"
    },
    headerList: {
        flexDirection: "row",
        width: "100%",
        height: 30,
        alignContent: "center",
        justifyContent: "center",
        borderBottomColor: "#445A14",
        borderBottomWidth: 1
    },
    textHeaderList: {
        width: "50%",
        height: 30,
        textAlign: "center",
        paddingTop: 3,
        fontSize: 14,
        fontFamily: "kavoon",
        color: "#445A14"
    },
})