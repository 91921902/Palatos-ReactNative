import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    containerPlanosEPacotes:{
        flex:1,
        width: '100%',
        paddingTop:150,
        backgroundColor: "white"
    },

    miniLogo:{
        width: 48,
        height: 47,

    },

    pacoteView:{
        width:'100%',
        textAlign: 'center',
        alignItems: 'center',
        height:50,
       
    },

    ViewLogo:{
        position: 'absolute',
        right:0,
        padding:15,
        backgroundColor:'red',
    },

    adquira:{
        width:'100%',
        fontFamily:'kavoon',
        fontSize: 24,
        color: '#445A14',
        textAlign: 'center',
    },

    plano:{
        textAlign: 'center',
        width: '100%',
        color: "#445A14",
        fontFamily:'lemonada',
        fontSize: 16,
        
    },

    viewTextoPlano:{
        alignItems: 'center',
        justifyContent:'center',
        padding:15,
        width: '100%',
        marginBottom: -30,
    },

    planoMensal:{
        width: "100%",
        height:"100%",
        borderRadius:10,
        resizeMode: "stretch",
    },

    botaoPosition:{
        alignItems: 'center',


    },

    botaoBanner:{
        width: "92%",
        height: 120,
        borderRadius:10,
       
    },

    botoes:{
        alignItens: 'center',
        width: '100%',
        position: 'relative',
        gap:15,
        
    },


})