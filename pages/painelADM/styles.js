import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerPainelADM: {
        width: "100%",
        height:'100%',
        alignItems: "center",
        paddingTop: 40
    },
    boxImgRest: {
        width: "100%",
        height: "30%",
        justifyContent: "center",
        alignItems: "center"
    },
    imgRest: {
        width: 200,
        height: 200,
        resizeMode: "contain"
    },
    boxAdm: {
        width: "100%",
        height: "70%",
        alignItems: "center",
        gap: 25,
        paddingTop: 20
    },
    textTitleAdm: {
        fontSize: 20,
        fontFamily: "kavoon",
        color: "#445A14"
    },
    boxBtnAdm: {
        alignItems: "center",
        gap: 20
    },
    btnAdm: {
        width: "80%",
        height: 50,
        backgroundColor: "#D1C0AB",
        borderRadius: 2,
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
    },
    textBtnAdm: {
        fontSize: 16,
        fontFamily: "lemonada",
        color: "#445A14"
    },
    boxIconCadeado: {
        position: "absolute",
        width: 30,
        height: 30,
        resizeMode: "contain",
        right: 10
    },
    iconCadeado: {
        width: 30,
        height: 30,
    }
})