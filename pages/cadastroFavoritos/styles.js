import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
container:{
    flex:1,
    width:'100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingBottom:30,
    backgroundColor:'white'
 },

 scroll:{
    flex:1,
    width:'100%',
    height:'100%',

 },

 fotoPessoa:{
    width:170,
    height:170,
    borderRadius:100,
    borderColor:'#445A14',
    borderWidth:2,
    paddingTop:30,
 },
 nome:{
    fontFamily:'kavoon',
    fontSize:22,
    color:'#445A14',
 },

 favoritosStar:{
  width:'90%',
  marginTop:10
 },

 textoReserva:{
    fontFamily:'kavoon',
    fontSize:14,
    color:'#445A14',
 },

emailEtel:{
   color: '#445A14',
   fontFamily: 'kavoon',
   fontSize: 14,
 },

 emailTelTexto:{
   width:'80%',
   alignItems:'flex-start',
   gap:30,
   marginBottom:20,
 },

 direcaoEmailTel:{
   flexDirection:'row',
   alignItems:'center',
   gap:5,
 },

 resposta:{
   color: '#445A14',
   fontFamily: 'lemonada',
   fontSize: 14,
   
 },

 visualizarReserva:{
    position:'relative',
    width: "80%",
    height: 200,
    borderColor:'#445A14',
    borderWidth:2,
    borderRadius:10,
 },

 favorito:{
   fontFamily: 'kavoon',
   fontSize: 17,
   color:'#445A14',
 },

 iconeReserva:{
   width:45,
   height:45,

 },
 viewReserva:{
   position:'absolute',
   bottom:15,
   right:10,
   
 }



});