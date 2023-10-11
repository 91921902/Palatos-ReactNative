import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerBuscaRestaurante:{
        flex: 1,
        width: "100%",
        height: "100%",  
        
      },
      restaurante:{ //primeira View
        width: "70%",
        height:"100%",
        backgroundColor:"transparent",
        borderWidth:2,
        borderColor:"#445A14",
        borderTopLeftRadius:20,
        borderBottomLeftRadius:20,
        borderRightColor:"transparent",

      },
    
      componente:{//segunda View 
        height:'80%',
        width:'100%',
        backgroundColor:"pink"

      },
      barraPesquisa:{
         width:"70%",
         height:50,
         flexDirection:"row"
      },
      barraPesquisa2:{
       width:"30%",
       height:"100%",
       borderTopRightRadius:20,
       borderBottomRightRadius:20,
       borderColor:"#445A14",
       borderWidth:2,
       borderLeftColor:"transparent",
       marginLeft:-3,

      },
      inicio:{
      width:"100%",
      height:"20%",
      alignItems:"center",
      justifyContent:"center",

      },
})