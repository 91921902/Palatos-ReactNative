import React from "react"; 
import { Pressable } from "react-native";
import {View , StyleSheet, Image, Text} from 'react-native'
import { Icon } from "react-native-elements";



export default function PedidoCliente({produto, onPress}){

    

    return (
        <View style={styles.pedidoCliente}>

            <View style={styles.nomePrato}>
                <Text style={styles.nomePratoTexto}>{produto.nome_produto}</Text>

                <Pressable onPress={onPress}>
                    <Icon name="delete" color={"red"} style={{borderColor: "red", borderWidth: 2, width: 40, height: 40, borderRadius: 5000, alignItems: "center", justifyContent: "center"}} />
                </Pressable>
                
            </View>

            <View style={styles.valor} >
                <Text style={styles.valorTexto}>R$ {produto.preco}</Text>
            </View> 


         </View>

    )
}

const styles=StyleSheet.create({

pedidoCliente:{
    width: '90%',
    height: 120,
    borderRadius:20,
    borderWidth:2,
    borderColor:'#445A14',
    padding: 15
    
},

nomePrato:{
   width: "100%",
   height: "50%",
   flexDirection: "row",
   alignItems: 'center',
   justifyContent: "space-between"
    

},

nomePratoTexto:{
    color: '#000',
    fontFamily: 'lemonada',
    fontSize: 14,
},

valor:{
    width: "100%",
    height: "50%",
    alignItems: "flex-end",
    justifyContent: "flex-end"
},
valorTexto:{
    color: '#000',
    fontFamily: 'lemonada',
    fontSize: 14,
},

})