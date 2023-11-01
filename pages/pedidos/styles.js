import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
    width: '100%',
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
        fontFamily: 'kavoon',
        fontSize:24,
      
    },
    paiPedido:{            
        flexDirection:'row',
        alignItems:'center',
        padding:20,
        paddingBottom:30,
    
    },
    pedido:{
        borderColor:'blue',
        alignItems:'center',
        paddingTop:15,
        gap:10,
        width: '100%',
        height: '100%',
    },

    valorTotalPai:{
        width:'100%',
        height:'10%',
        paddingTop:40,

    },

    scroll:{
        width:'100%',
        height:300,
        borderWidth:1,
       flex:1
    },

    valorTotal:{
        color: '#000',
        fontFamily: 'lemonada',
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
        fontFamily: 'kavoon',
        fontSize: 12,
    }


   

});