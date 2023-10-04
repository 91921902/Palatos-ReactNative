import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerPagInicial: {
        flex: 1,
        backgroundColor: '#fff',
        width: "100%",
        height: "100%",  
      
    },
    loginRestaurante:{ //primeira View
        height:'10%',
        width:'100%',
        alignItems: "flex-end", // Alinhar à direita
        justifyContent: "flex-start", // Alinhar ao topo
        paddingTop: 20, // Espaço superior
        paddingRight: 20, // Espaço direito
        backgroundColor: "green",
    },
    botaoLogin:{
        width: 130,//largura
        height: 30,//altura
        backgroundColor: 'transparent', // Cor de fundo transparente
        borderColor: "#445A14",
        borderRadius: 20,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo:{ //View logo
        height:'20%',
        width:'100%',
    },
      textoBotaoLogin:{
        fontFamily: "lemonada",
        color: "#445A14",
        fontSize: 10,
        textAlign:"center",
        fontStyle:"normal",
        fontWeight:380,
        lineHeight:"normal",
        width: 122,
        height: 24,
        flexShrink: 0,
    },
    formularioPagInicial:{ //segunda View
       alignItems: "center",
       height:'40%',
       width:'100%',
       justifyContent: 'center',
       gap:20,
       backgroundColor:"pink"
           
    },
    inputsFormulario:{
        width: "100%",
        alignItems: "center", 
    },
    textoInput:{
        fontFamily: "lemonada",
        color: "#445A14",
        fontSize: 15,
        paddingLeft: 5,
        width:'80%',

    },
    input:{
        width: "80%",
        height: 50,
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#445A14",
        borderRadius: 15,
        fontSize: 12,
        paddingLeft: 10,
        fontFamily: "lemonada"

    },
    entrar:{//terceira View
       height:'20%',
       width:'100%',
       backgroundColor:'red',
        

    },
    botaoEntrar:{
        width:229,
          height:44,
          backgroundColor:'transparente',
          borderColor: "#445A14",
          borderRadius:22,
          alignSelf: 'center', 
          textAlignVertical: 'top',
          alignSelf:'center', 
         textAlignVertical: 'top',
         borderWidth:2,
         justifyContent:'center',
         alignItems: 'center',

    },
    textoBotaoEntrar:{
        

    },
    cadastro:{//ultima View
       height:'10%',
       width:'100%',
       backgroundColor:'black',

    },
    botaoCadastro:{
        width: "202",
        height: 27,
        flexShrink: 0,

    },
    textoCadastro:{
       color: "#445A14",
       textAlign: justify,
       fontFamily: "Lemonada",
       fontSize: 16,
       fontStyle: normal,
       fontWeight: 380,
       lineHeight: normal,

    },
  
})