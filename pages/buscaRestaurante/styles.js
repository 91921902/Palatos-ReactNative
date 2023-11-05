import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerBuscaRestaurante:{
        flex: 1,
        width: "100%",
        height: "100%",  
        
      },
      restaurante:{ //primeira View
        width: "80%",
        height:"100%",
        backgroundColor:"transparent",
        borderWidth:2,
        borderColor:"#445A14",
        borderTopLeftRadius:20,
        borderBottomLeftRadius:20,
        borderRightColor:"#445A14",
        paddingLeft:10,
        fontSize:18,
        fontFamily:'lemonada',
      },
    
      componente:{//segunda View 
        height:'80%',
        width:'100%',
        alignItems: 'center',
        gap:30,

      },
      barraPesquisa:{
         width:"70%",
         height:50,
         flexDirection:"row"
      },
      barraPesquisa2:{
       width:"20%",
       height:"100%",
       borderTopRightRadius:20,
       borderBottomRightRadius:20,
       borderColor:"#445A14",
       borderWidth:2,
       borderLeftColor:"#445A14",
       marginLeft:-3,
       justifyContent:"center",
       alignItems: "flex-end",
       paddingRight:20,

      },
      inicio:{
      width:"100%",
      height:"20%",
      alignItems:"center",
      justifyContent:"center",

      },
})