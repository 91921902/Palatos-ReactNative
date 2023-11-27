import React, { useState, useEffect } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import { styles } from './styles'
import * as Font from 'expo-font';
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import PedidoCliente from '../../components/PedidoCliente';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../providers/api';
import decode from 'jwt-decode'
import BotaoVoltar from '../../components/BotaoVoltar';
import { useFormTools } from '../../providers/FormRestContext';
import BuscaRestaurante from '../buscaRestaurante/BuscaRestaurante';

export default function Pedidos({ navigation, route }) {

  const [fontLoaded, setFontLoaded] = useState(false);
  const [pedido, setPedido] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);
  const [isReservation, setIsReservation] = useState(false);
  const { setNewCarrinho, carrinho } = useFormTools()
  const [needRender, setNeedRender] = useState(false)


  const { idRest } = route.params;
  //await AsyncStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzLCJpYXQiOjE3MDEwMzQ3MTksImV4cCI6MjMwNTgzNDcxOX0.IPS0TEfx5BQiVaMWiolApvOa7-5EB7kcyHx2FHSAu_c")

  


  async function buscarCarrinho() {

    let cliente = JSON.parse(await AsyncStorage.getItem('cliente'))

    if (cliente) {
      const { idMesa, idRestaurante } = cliente
      await api.get("users/carrinhoMesa/getAll/" + idMesa).then(response => {
        setPedido(response.data.carrinho)
        
      });


    } else {
      setIsReservation(true);
      const token = await AsyncStorage.getItem('token');

      let id
      try {
        const decoded = decode(token)
        const { userId } = decoded
        id = userId
      } catch (error) {
        console.log(error)
      }

      try {

        await api.get('users/carrinhoReserva/getAll/' + idRest, {
          headers: {
            Authorization: token
          }
        })
          .then(response => {
            setPedido(response.data.carrinho)
            
          });

      } catch (error) {
        console.log(error)
      }

    }

    if (pedido) {
      setNewCarrinho(pedido)
    }

    

  }

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'kavoon': fontKavoon,
        'lemonada': fontLemonada,
      });
      setFontLoaded(true);
    }

    loadFonts();


    buscarCarrinho();

  }, []);

  if (!fontLoaded) {
    return null;
  }

  async function criarComanda() {

    let cliente = await AsyncStorage.getItem("cliente")
    const {idMesa} = JSON.parse(cliente)

    const resposta = await api.post("restaurante/comandas/createComanda", { idMesa: idMesa })
      .then(response => response.data)

    if (resposta.status == 'success') {

      await AsyncStorage.removeItem("cliente")
      setNewCarrinho([])
      alert("Pedido enviado!")

      navigation.navigate("BuscaRestaurante")

    } else {
      alert("Tivemos um problema com seu pedido")
    }

  }


  async function deleteProduct(id) {
    
    setPedido([...pedido].filter(item => item.id !== id))

    let cliente = await AsyncStorage.getItem("cliente")

    if (cliente) {

      cliente = JSON.parse(cliente)

      const { idMesa } = cliente

      const result = await api.delete(`/users/carrinhoMesa/deleteItem/${idMesa}/${id}`)

      if (result.data.status != 'success') {
        console.log("erro ao deletar o item do carrinho")
      }

    } else {


      const token = await AsyncStorage.getItem("token")

      try {

        await api.delete("users/carrinhoReserva/deleteItem/" + id, {
          headers: {
            Authorization: token
          }
        })



      } catch (error) {
        console.log(error)
      }
    }

  }

  function reservar() {

    if (pedido.length == 0) {
      alert("O carrinho esta vazio")
      return
    }
    setNewCarrinho(pedido)

    navigation.navigate("DescricaoReserva")

  }

  return (
    <View style={styles.container}>
      <BotaoVoltar onPress={() => navigation.navigate("MenuRestaurante", {
        idRestaurante: idRest
      })} />

      <View style={styles.paiPedido}>
        <Image
          style={styles.icone}
          source={require('../../assets/pedido-online.png')}

        />
        <Text style={styles.textoPedido}>Seu pedido:</Text>
      </View>

      <ScrollView style={{ width: '100%' }} >
        <View style={styles.pedido}>
          {
            pedido.map(produto => {
              return (
                <PedidoCliente produto={produto} key={produto.id} onPress={async () => {
                  try {
                    await deleteProduct(produto.id)
                    
                  } catch (error) {
                    console.log(error)
                  }
                }} />
              )
            })
          }
        </View>
      </ScrollView>

      <View style={styles.valorTotalPai}>
        {/* <Text style={styles.valorTotal}>Valor total: R$ {valorTotal}</Text> */}
      </View>

      <View style={styles.botoes}>

        {
          isReservation ? (

            <Pressable style={styles.btnFim} onPress={reservar}>
              <Text style={styles.textoBtn}>Reservar</Text>
            </Pressable>

          ) : (

            <Pressable style={styles.btnFim} onPress={criarComanda}>
              <Text style={styles.textoBtn}>Finalizar pedido</Text>
            </Pressable>

          )
        }

      </View>

    </View>
  );
}