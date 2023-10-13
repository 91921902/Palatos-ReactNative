import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
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
        fontFamily: 'Kavoon',
        fontSize: 20,
    },
    descricao:{
        paddingTop:10,
    },
    regrasTexto:{
        color: '#445A14',
        textAlign: 'center',
        fontFamily: 'Kavoon',
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
        textAlign: 'column',
        fontFamily: 'Lemonada',
        fontSize: 12,
    },

    dataEhora:{
        color: '#445A14',
        textAlign: 'center',
        fontFamily:'Kavoon',
        fontSize: 14,
    },

    viewData:{
        marginTop:20,
    },

    dataTitulo:{
        color: '#445A14',
        fontFamily: 'Lemonada',
        fontSize: 14,
    },

    horarioTitulo:{
        color: '#445A14', 
        fontFamily: 'Lemonada',
        fontSize: 14,   
    }
});
