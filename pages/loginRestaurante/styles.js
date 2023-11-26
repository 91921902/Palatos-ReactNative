import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      paddingTop: 30,
      backgroundColor:'white',
    
    },
  
    logo: {
      width: 311,
      height: 322,
      marginTop:-50,
    },
  
    inputs: {
      width: "80%",
      height: 50,
      borderRadius: 20,
      borderWidth: 2, 
      borderColor: '#445A14',
      backgroundColor: '#FFF', 
      marginLeft: 10, 
      paddingLeft: 15
    },
  
    btnEntrar:{
      width: 150,
      height: 50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius: 20,
      borderWidth: 2, 
      borderColor: '#445A14', 
      marginTop:10,
    },
  
    palavraEntrar:{
      color:'#445A14',
      fontFamily:'lemonada'

      },
  
    emailSenha:{
    width:"80%",
    paddingLeft:30,
    color: '#445A14',
    textAlign: 'justify',
    fontSize: 16,
    marginBottom:-10,
    fontFamily:'lemonada',

  },

  textoLembrar:{
    color: '#445A14',
    fontFamily: 'lemonada',
    fontSize: 16,
    marginLeft: 10,
    
  },
  boxSemCadastro: {
    width: "100%",
    padding: 20,
    flex: 1,
    justifyContent: "flex-end"
  },
  textSemCadastro: {
    color: "#445A14",
    textAlign: "justify",
    fontFamily: "lemonada",
    fontSize: 16
  }
  });