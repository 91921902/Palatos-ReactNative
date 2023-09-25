import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerNovoCadastro: {
        flex: 1,
        backgroundColor: "#fff",
        width: "100%",
        height: "100%"
    },
    boxUploadPhoto: {
        width: "100%",
        height: "30%",
        alignItems: "center",
        justifyContent: "center",
        
    },
    buttonUpload: {
        width: 150,
        height: 150,
        borderRadius: 5000,
        backgroundColor: "#92A14D",
        position: "relative",
        alignItems: "center",
        justifyContent: "center"
    },
    btnMais: {
        position: "absolute",
        top: 15,
        right: 15,
        width: 20,
        height: 20
    },
    formularioCadastroRest: {
        width: "100%",
        alignItems: "center",
        gap: 20
     
    },
    boxInpt: {
        width: "80%",
    },
    formText: {
        fontFamily: "lemonada",
        color: "#445A14",
        fontSize: 15,
        paddingLeft: 5
    },
    inptFormRest: {
        width: "100%",
        height: 50,
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#445A14",
        borderRadius: 15,
        fontSize: 12,
        paddingLeft: 10,
        fontFamily: "lemonada"
       
    },
    boxReserva: {
        alignItems: "center"
    },
    btnYesOrNot: {
        width: 200,
        height: 50,
        borderWidth: 2,
        borderColor: "#92A14D",
        borderRadius: 10,
        position: "relative",
        flexDirection:"row",
        alignItems: "center",
        marginBottom: 20
    },
    textBtnYes: {
        
        textAlign: "center",
        verticalAlign: "middle",
        fontFamily: "lemonada",
        fontSize: 15,
        zIndex: 2
    },
    textBtnNot: {
        
        textAlign: "center",
        verticalAlign: "middle",
        fontFamily: "lemonada",
        fontSize: 15,
        zIndex: 2
    },
    controllerBtnYesOrNot: {
        position:"absolute",
        width: "48%",
        height: "90%",
        backgroundColor: "#92A14D",
        borderRadius: 10,
        
    }
})