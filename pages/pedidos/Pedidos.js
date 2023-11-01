import React,  {useState,useEffect} from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import{styles} from './styles'
import * as Font from 'expo-font';
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import PedidoCliente from '../../components/PedidoCliente';

export default function Pedidos() {

    const [fontLoaded, setFontLoaded] = useState(false);
    const [pedido, setPedido]= useState([]);
    const [valorTotal, setValorTotal]=useState(0);

    useEffect(() => {
        async function loadFonts() {
        await Font.loadAsync({
            'kavoon': fontKavoon,
            'lemonada': fontLemonada,
        });
        setFontLoaded(true);
        }

        loadFonts();
    }, []);

    if (!fontLoaded) {
        return null; 
    }

    function somarValorTotal(){
        let valor=0
        for(let produto of pedido){
          valor+=produto.preco 
      }
      setValorTotal(valor)
    }

  return (
    <View style={styles.container}>

      <View style={styles.paiLogo}>
        <Image
          style={styles.logo}
          source={require('../../assets/mini-logo.png')}
        />
      </View>

      <View style={styles.paiPedido}>
          <Image 
          style={styles.icone}
          source={require('../../assets/pedido-online.png')}
          
          />
          <Text style={styles.textoPedido}>Seu pedido:</Text>
     </View>

      <ScrollView style={{width: '100%'}} >
          <View style={styles.pedido}>
           {
            pedido.map(produto => {
              return (
                <PedidoCliente produto={produto}/>
              )
            })
           }
          </View>
      </ScrollView>

      <View style={styles.valorTotalPai}>
        <Text style={styles.valorTotal}>Valor total: R$ {valorTotal}</Text>
      </View>


      <View style={styles.botoes}>

          <Pressable style={styles.btnFim}> 
             <Text style={styles.textoBtn}>Finalizar pedido</Text>
          </Pressable>

          <Pressable style={styles.btnFim}>
              <Text style={styles.textoBtn}>Reservar</Text>
            </Pressable>

      </View>

    </View>

    
  );
}