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
        paddingTop: 50, // Espaço superior
        paddingRight: 20, // Espaço direito
       
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
        alignItems:"center",
        paddingBottom:60,
    },   
    logoTexto:{
        width:300,
        height:300,
        resizeMode: "contain",
        
       
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
       alignItems: "center",
       justifyContent: 'center',
       gap:20,
       justifyContent: 'flex-start', 
       paddingTop: 20, 
        

    },
    botaoEntrar:{
        width: "40%",
        height: 50,
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#445A14",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center"
    },
    textoBotaoEntrar:{
        color:"#445A14",
        fontFamily: "lemonada",
        fontSize: 16,
        textAlign: "center",
    },
    cadastro:{//ultima View
       height:'10%',
       width:'100%',
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
       fontFamily: "lemonada",
       fontSize: 16,


    },
  
})