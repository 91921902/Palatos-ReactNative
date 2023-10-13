import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
  
    logo: {
      width: 52,
      height: 48,
    },

    paiLogo:{
        alignItems: 'flex-end',
        paddingLeft: 250, 
        paddingTop: 16, 
    },
    icone:{
        width: 62,
        height: 62,   
    },
    textoPedido:{
        color: '#445A14',
        textAlign: 'center',
        fontFamily: 'Kavoon',
        fontSize:24,
        margin:-10,
    },
    paiPedido:{
        flexDirection:'row',
        alignItems:'center',
        margin:-10,
        padding:20,
        paddingBottom:30,
    
    },
    pedido:{
        width:'100%',
        alignItems:'center',
        paddingTop:15,
        gap:10,
    },

    valorTotalPai:{
        width:'100%',
        height:'10%',
        paddingTop:40,

    },

    scroll:{
        width:'100%',
        height:300,
    },

    valorTotal:{
        color: '#000',
        fontFamily: 'Lemonada',
        fontSize: 14,
    },

    botoes:{
        width:'100%',
        alignItems:'flex-end',
        gap:10,
    },

    btnFim:{
        width:'50%',
        borderWidth:2,
        borderRadius:20,
        borderColor:'#445A14' ,
        alignItems:'center',
        justifyContent:'center',
        padding:15,
        gap:10,
        
    },

    textoBtn:{
        color: '#445A14',
        textAlign: 'center',
        fontFamily: 'Kavoon',
        fontSize: 12,
    }


   

});