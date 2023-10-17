import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerFiltros: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        paddingBottom: 10,
        backgroundColor: "#fff"
    },
    boxFilter: {
        width: "100%",
        height: "40%",
        alignItems: "center",
        paddingTop: 100,
    },
    boxBtnFilter: {
        width: 170,
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
    dateInput: {
        width: 150,
        height: 50,
        borderWidth: 2,
        borderColor: "#445A14",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center"
    },
    textDate: {
        fontSize: 18,
        fontFamily: "lemonada",
        color: "#445A14"
    },

    boxList: {
        width: "90%",
        minHeight: "48%",
        marginTop: "2%",
        borderWidth: 2,
        borderColor: "#B7A187",
    },
    boxTextHeader: {
        width: "100%",
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1, 
        borderColor: "#445A14"
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
    boxTextProductsNotFound: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        paddingTop: 30,
    },
    textFiltros: {
        color: "#445A14",
        fontSize: 26,
        fontFamily: "kavoon"
    },
    boxSearch: {
        alignItens: "center", 
        justifyContent: "center",
        backgroundColor: "#D1C0AB",
        width: 170,
        padding: 5,
        marginTop: 5
    },
    textSearch: {
        color: "#445A14",
        fontSize: 14,
        fontFamily: "lemonada",
        textAlign: "center"
    },
    boxFilterSearch: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-evenly"
    }
})