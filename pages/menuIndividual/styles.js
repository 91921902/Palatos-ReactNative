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
 },

miniLogo:{
    width:52,
    height:48,
},

caixaFoto:{
width:'100%',
height:'30%',
alignItems: 'center',

},

foto:{
    width: 160,
    height: 160,
    borderRadius: 5000,
    borderWidth: 3,
    borderColor:'#445A14',
},

tituloDoPrato:{
    color:'#445A14',
    fontSize:'16px',
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
    fontFamily: 'Lemonada',
    fontSize: 12,
    fontWeight: 380,
    marginTop:10,
},
observacoes:{
    width: 243,
    color:'#445A14',
    fontSize:'16px',
    fontFamily:'kavoon',
},

inpObs:{
    width: 243,
    height: 88,
    borderRadius: 10,
    borderWidth:3,
    borderColor:'#445A14',
    backgroundColor: "#FFF",
    marginTop:3,
    fontFamily:'Lemonada',
    fontSize: 12,


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
    color: '#000',
    width: 243,
    fontFamily: 'Kavoon',
    fontSize: 32,
    fontWeight: 400,
},

valorView:{
    width: 134,
    height: 41, 
    alignItems: 'center',
},

btnCarrinho:{
    width: 109,
    height: 45,
    borderRadius: 10,
    borderColor:'#445A14',
    borderWidth:3,

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
    fontFamily: 'Kavoon',
    fontSize: 12,
    padding:5,
}

});