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
        // backgroundColor: "green",
    },
    botaoLogin:{
        width: 140,//largura
        height: 50,//altura
        backgroundColor: 'transparent', // Cor de fundo transparente
        borderColor: "#445A14",
        borderRadius: 20,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo:{ //View logo
        height:'30%',
        width:'100%',
        alignItems:"center"
    },
    logoTexto:{
        width:300,
        height:300,
        resizeMode: "contain"
    },
      textoBotaoLogin:{
        fontFamily: "lemonada",
        color: "#445A14",
        fontSize: 10,
        textAlign:"center",
        fontStyle:"normal",
        width: 122,
        height: 24,
        flexShrink: 0,
    },
    formularioPagInicial:{ //segunda View
       alignItems: "center",
       height:'30%',
       width:'100%',
       justifyContent: 'center',
       gap:20,
    //    backgroundColor:"pink"
           
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
        fontFamily: "lemonada",

    },
    entrar:{//terceira View
       height:'20%',
       width:'100%',
    //    backgroundColor:'red',
       alignItems: "center",
       justifyContent: 'center',
       gap:20,
       justifyContent: 'flex-start', 
       paddingTop: 20, 
        

    },
    botaoEntrar:{
        width: "80%",
        height: 50,
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#445A14",
        borderRadius: 15,
        fontSize: 12,
        paddingLeft: 10,
        fontFamily: "lemonada",
        alignItems:"center",
    },
        textoBotaoEntrar:{
        color:"#445A14",
        textAlign: "justify",
        fontFamily: "Lemonada",
        fontSize: 16,
        fontStyle: "normal",
                

    },
    cadastro:{//ultima View
       height:'10%',
       width:'100%',
    //    backgroundColor:'black',
    //    justifyContent: 'flex-end',
       paddingBottom: 20,

    },
    botaoCadastro:{
        width:250,
        height:27,
        flexShrink: 0,
        paddingLeft: 20,

    },
    textoCadastro:{
       color: "#445A14",
       textAlign: "justify",
       fontFamily: "Lemonada",
       fontSize: 16,
       fontStyle: "normal",
    

    },
  
})