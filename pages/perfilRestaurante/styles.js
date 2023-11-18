import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerPerfilRestaurante:{
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor:"white",  
        
      },

    boxImgemRest: {
        width: "100%",
        height: "30%",
        justifyContent: "center",
        alignItems: "center",
        paddingTop:50,
    },
    imgemRest: {
        width: 200,
        height: 200,
        resizeMode: "cover",
        borderRadius: 5000
    },
    boxNomeRest:{
        width: "100%",
        height: "10%",
        justifyContent: "center",
        alignItems: "center"

    },
    nomeRestaurante:{
        color: '#445A14',
        fontFamily: 'kavoon',
        fontSize: 24,
        fontStyle: 'normal',
   

    },
    boxFavoritos:{
        width: "100%",
        height: "10%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection:'row',
        gap:8,

    },
    favoritos:{
     width:40,
     height:40,
      
    },
    scrollView:{
      width:'80%',
      height:'80%',
      backgroundColor:'#D1C0AB',
      borderRadius:10,
      padding:10,
    },
    textoScrollView:{
        color: "#445A14",
        textAlign: "justify",
        fontFamily: "lemonada",
        fontSize: 16,
        fontStyle: "normal",
        
    },

    boxDescricao:{
        width: "100%",
        height: "40%",
        justifyContent: "center",
        alignItems: "center",
        paddingTop:20,

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
        fontFamily: "kavoon",
        fontSize: 16,
        fontStyle: "normal",
    
        textAlign: "right",
        paddingRight: 20,
    },
})