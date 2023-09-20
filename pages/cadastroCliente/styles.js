import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
      
      },
    
      titulo:{
       flex:1,
       backgroundColor:'green',
       width:'100%',
       alignItems:'center',
       justifyContent:'center',
      },
      formulario:{
        flex:4,
        backgroundColor:'#fff',
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
      },
    
      confirmar:{
       flex:1,
       backgroundColor:'red',
       width:'100%',
       },
       inputs:{
        width:229,
        height:44,
        flexShrink:0,
        backgroundColor:'#D1C0AB',
        filter:'dropShadow(0 4 4 rgba(0, 0, 0, 0.25))',
       },
       textoInput:{
          color:'#445A14',
          textAlign:'justify',
          fontFamily:'Lemonada',
          fontSize:16,
          fontStyle:'normal', 
       
        },
    
})