import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
container:{
    backgroundColor:'white',
    flex:1,
    width:'100%',
    height:'100%',
    alignItems: 'center',
    paddingTop: 60,
 },

 scroll:{
    flex:1,
    width:'100%',  
    backgroundColor:'blue',
    height:'100%',
 },

miniLogo:{
    width:52,
    height:48,
},

caixaFoto:{
width:'100%',
height:'30%',
alignItems: 'center',
marginTop:20
},

foto:{
    width: 160,
    height: 160,
    borderRadius: 5000,
    borderWidth: 3,
    borderColor:'#445A14',
},

fotoProduto:{
    width:"100%",
    height:"100%",
    borderRadius:5000,

},

tituloDoPrato:{
    color:'#445A14',
    fontSize:16,
    fontFamily:'kavoon',
    alignItems: 'center',
    justifyContent : 'center',
    width:'100%',
    textAlign:'center',
},

descricaoView:{
    width: 262,
    height: 85,
},

descricao:{
    color: "#445A14",
    textAlign: 'center',
    justifyContent:'center',
    fontFamily: 'lemonada',
    fontSize: 12,
    marginTop:10,
},
observacoes:{
    width: 243,
    color:'#445A14',
    fontSize:16,
    fontFamily:'kavoon',
},

inpObs:{
    width:'80%',
    height: 150,
    borderRadius: 10,
    borderWidth:3,
    borderColor:'#445A14',
    backgroundColor: "#FFF",
    marginTop:3,
    fontFamily:'lemonada',
    fontSize: 12,


},
numero:{
marginRight:20,

},

numeros:{
    fontSize: 15,
    fontFamily:'lemonada',
    color:'black',

},

icones:{
    flexDirection: 'row',
    width: 243,
    gap: 5,
    justifyContent: 'flex-end',
    paddingRight:20,
    alignItems: 'center',
    marginTop:10,

},

valor:{
    width: 243,
    fontFamily: 'kavoon',
    fontSize: 32,
    paddingTop:15,
},

valorView:{
    width: 134,
    height: 41, 
    alignItems: 'center',
    backgroundColor:'red'
},

btnCarrinho:{
    width:150,
    height: 55,
    borderRadius: 10,
    borderColor:'#445A14',
    borderWidth:3,
    marginBottom:20,
    alignItems: "center",
    justifyContent: "center"

},
carrinhoView:{
    flex: 1, 
    justifyContent: 'flex-end', 
    alignItems: 'flex-end', 
    width: '100%',
    padding:20,
},
textoCarrinho:{
    color: '#445A14',
    textAlign: 'center',
    fontFamily: 'kavoon',
    fontSize: 12,
}

});