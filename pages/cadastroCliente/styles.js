import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerCadastroCliente: {
        flex: 1,
        backgroundColor: '#fff',
        width: "100%",
        height: "100%"
      
      },
    
      titulo:{ 
       flex: 0.2,
       width:'100%',
       alignItems:'center',
       justifyContent:'center',
       backgroundColor: 'green',
      },
      textoTitulo:{
        // fontFamily: "Kavoon",
        color: "#445A14",
        fontSize: 15,
        paddingLeft: 5,
      },
      formularioCadastroCliente:{
        flex: 0.8, 
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop:20,
      },
       inputs:{
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
       textoInput:{
        fontFamily: "lemonada",
        color: "#445A14",
        fontSize: 15,
        paddingLeft: 5
       
        },
        confirmar:{
        width: "100%",
        alignItems: "center",
        
       },
        botaoConfirmar:{
          width:229,
          height:44,
          backgroundColor:'#445A14',
          borderRadius:22,
          alignSelf: 'center', 
          textAlignVertical: 'top',
          alignSelf:'center', 
         textAlignVertical: 'top',
        },
        textoBotaoConfirmar:{
          color:'#fff',
          textAlign:'justify',
          fontSize:16,
          fontStyle:'normal',
         
        },
    
})