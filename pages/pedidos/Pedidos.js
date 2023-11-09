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

export default function Pedidos({ navigation }) {

  const [fontLoaded, setFontLoaded] = useState(false);
  const [pedido, setPedido] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);
  const [isReservation, setIsReservation] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'kavoon': fontKavoon,
        'lemonada': fontLemonada,
      });
      setFontLoaded(true);
    }

    loadFonts();

    async function buscarCarrinho() {

      const cliente = JSON.parse(await AsyncStorage.getItem('cliente')) //MEGA IMPORTANTE

      if (cliente) {
        const { idMesa, idRestaurante } = cliente
        const carrinho = await api.get("users/carrinhoMesa/getAll/" + idMesa).then(response => response.data.pratos);
        setPedido(carrinho)

      } else {
        setIsReservation(true);
        const token = await AsyncStorage.getItem('token');

        let id
        try {
          const decoded = decode(token)
          const { userId } = decoded
          id = userId
        } catch (error) {

        }
        const carrinho = await api.get('users/carrinhoReserva/' + id)
          .then(response => response.data.carrinho);
        setPedido(carrinho)
        somarValorTotal()

      }

    }

    buscarCarrinho();
  }, []);

  if (!fontLoaded) {
    return null;
  }

  function somarValorTotal() {
    let valor = 0
    for (let produto of pedido) {
      valor += produto.preco
    }
    setValorTotal(valor)
  }

  return (
    <View style={styles.container}>
      <BotaoVoltar/>

     

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
                <PedidoCliente produto={produto} />
              )
            })
          }
        </View>
      </ScrollView>

      <View style={styles.valorTotalPai}>
        <Text style={styles.valorTotal}>Valor total: R$ {valorTotal}</Text>
      </View>


      <View style={styles.botoes}>

        {
          isReservation ? (
            <Pressable style={styles.btnFim} onPress={() => navigation.navigate("DescricaoReserva")}>
              <Text style={styles.textoBtn}>Reservar</Text>
            </Pressable>
          ) : (

            <Pressable style={styles.btnFim}>
              <Text style={styles.textoBtn}>Finalizar pedido</Text>
            </Pressable>

          )

        }


      </View>

    </View>


  );
}