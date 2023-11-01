import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 15,
      paddingBottom:100,
    
    },
  
    logo: {
      width: 311,
      height: 322,
      marginTop:-50,
    },
  
    inputs: {
      width: 245,
      height: 50,
      borderRadius: 20,
      borderWidth: 2, 
      borderColor: '#445A14',
      backgroundColor: '#FFF', 
      marginLeft: 10, 
    },
  
    btnEntrar:{
      width: 117,
      height: 41,
      justifyContent:'center',
      alignItems:'center',
      borderRadius: 20,
      borderWidth: 2, 
      borderColor: '#445A14', 
      backgroundColor: '#FFF',
      
    },
  
    palavraEntrar:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      padding:10,
      color:'#445A14',
      fontFamily:'lemonada'
      },
  
    emailSenha:{
    width:210,
    color: '#445A14',
    textAlign: 'justify',
    fontSize: 16,
    fontStyle: 'normal', 
    lineHeight: 20, 
    marginBottom:-10,
    fontFamily:'lemonada'
  },

  textoLembrar:{
    color: '#445A14',
    fontFamily: 'lemonada',
    fontSize: 16,
    marginLeft: 10,
    
  }
  });