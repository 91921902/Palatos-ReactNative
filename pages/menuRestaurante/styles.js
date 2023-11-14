import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerMenuRestaurante:{
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor:'white',  
        
      },
      menuRestaurante:{ //primeira View
        width:'100%',
        height:'17%',
        flexDirection:'row',
        alignItems:'flex-end',
        justifyContent: 'space-evenly',
        marginBottom:10,

 
      },
      menu:{
        color:'#445A14',
        fontFamily:'lemonada',  
        fontSize: 18,
        fontstyle:'normal',


      },
      nomePrato:{//segunda View
        width:"100%",
        height:"100%",
        alignItems:'center',
        gap:30,
        

      }
        
    
   
})