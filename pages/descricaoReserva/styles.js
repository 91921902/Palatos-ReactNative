import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: "white"
    },

    logoRegras:{
        width: 67,
        height: 69,

    },

    paiLogoRegras:{
        paddingTop:40,
    },

    descricaoText:{
        color: '#445A14',
        textAlign: 'center',
        fontFamily: 'kavoon',
        fontSize: 20,
    },
    descricao:{
        paddingTop:10,
    },
    regrasTexto:{
        color: '#445A14',
        textAlign: 'center',
        fontFamily: 'kavoon',
        fontSize: 14,
    },
    regrasTitulo:{
        paddingTop:10,
    },

    descricaoRegras:{
        width:'80%',
        alignItems:'flex-start',
        borderWidth:2,
        borderRadius:15,
        borderColor:'#E50505',
        flexDirection:'column',
        gap:21,
        marginTop:19,
        padding:20,
    },

    textoRegras:{
        color: '#445A14',
        fontFamily: 'lemonada',
        fontSize: 12,
    },

    dataEhora:{
        color: '#445A14',
        textAlign: 'center',
        fontFamily:'kavoon',
        fontSize: 14,
    },

    viewData:{
        marginTop:20,
    },

    dataTitulo:{
        color: '#445A14',
        fontFamily: 'lemonada',
        fontSize: 14,
    },
    textDate: {
        width:'100%',
        textAlign:"center",
        fontSize: 16,
        fontFamily: "lemonada",
        color: "#445A14",
        paddingTop:2
    },
    horarioTitulo:{
        color: '#445A14', 
        fontFamily: 'lemonada',
        fontSize: 14,   
    },
    inptData:{
        width: 121,
        height: 47
    },

    dataEhorario:{
        flexDirection:'row',
        width:'90%',
        paddingTop:10,

    },
    dataView:{
      width:'50%',
      height:'100%',
      alignItems:'center',
    },

    horarioView:{
      width:'50%',
      height:'100%',
      alignItems:'center',
    },

    inptData:{
     width:121,
     height:47,
     borderWidth:2,
     borderRadius:20,
     borderColor:'#445A14',
     textAlign:"center",
    },

    inptHora:{
        width:121,
        height:47,
        borderWidth:2,
        borderRadius:20,
        borderColor:'#445A14',
        textAlign:"center",
        fontSize: 18,
        fontFamily: "lemonada",
        color: "#445A14",
    },
    btnConfirmar:{
        width:121,
        height:47,
        borderWidth:2,
        borderRadius:10,
        borderColor:'#445A14',   
    },

    confirmar:{
        color: '#445A14',
        textAlign: 'center',
        fontFamily:'kavoon',
        fontSize: 14, 
        paddingTop:10,
    },

    viewBtnConfirmar:{
        flex:1,
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    }
});
