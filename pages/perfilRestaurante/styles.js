import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerPerfilRestaurante:{
        flex: 1,
        width: "100%",
        height: "100%",  
        
      },

    boxImgemRest: {
        width: "100%",
        height: "30%",
        justifyContent: "center",
        alignItems: "center"
    },
    imgemRest: {
        width: 200,
        height: 200,
        resizeMode: "contain"
    },
    boxNomeRest:{
        width: "100%",
        height: "10%",
        justifyContent: "center",
        alignItems: "center"

    },
    boxFavoritos:{
        width: "100%",
        height: "10%",
        justifyContent: "center",
        alignItems: "center"

    },
    boxDescricao:{
        width: "100%",
        height: "40%",
        justifyContent: "center",
        alignItems: "center"

    },
    boxMenu:{
       height:'10%',
       width:'100%',
       flexDirection: 'row', // Usar flexbox em linha
       justifyContent: 'flex-end', // Alinhar no final da linha (canto direito)
       alignItems: 'center', // Alinhar verticalmente ao centro
      
    },
    botaoMenu:{
      width:250,
      height:27,
      flexShrink: 0,
    

    },
    textoMenu:{
        color: "#445A14",
        textAlign: "justify",
        fontFamily: "Kavoon",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "normal",
        textAlign: "right",
        paddingRight: 20,
    },
})