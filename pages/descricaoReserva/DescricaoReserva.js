import React,  {useState,useEffect} from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import{styles} from './styles'
import * as Font from 'expo-font';
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import PedidoCliente from '../../components/PedidoCliente';
import DateTimePicker from '@react-native-community/datetimepicker';
import api from '../../providers/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DescricaoReserva({navigation}) {
    //precisa do idRestaurante, userId(para pegar o carrinho), idMesa(boa parte disso vai estar o asyncStorage)
    const [fontLoaded, setFontLoaded] = useState(false);
    const [tolerancia, setTolerancia]= useState(0);
    const [date,setDate]=useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [horario, setHorario] = useState('');

    useEffect(() => {
        async function loadFonts() {
        await Font.loadAsync({
            'kavoon': fontKavoon,
            'lemonada': fontLemonada,
        });
        setFontLoaded(true);
        }

        loadFonts();


         //formato yyyy/mm/ddT19:00:00:00Z

       
    }, []);

    const showDatepicker = () => {
      setShowDatePicker(true);
    };

    const onDateChange = (event, selectedDate) => {
      setShowDatePicker(false);
      if (selectedDate) {
          setDate(selectedDate);
      }
    };

    if (!fontLoaded) {
        return null; 
    }
    
    const mudarHorario = (text) => {
      // Remove qualquer caracter não numérico
      const numericText = text.replace(/\D/g, '');


          if (numericText.length <= 2) {
            setHorario(numericText);
          } else {
            setHorario(`${numericText.slice(0, 2)}:${numericText.slice(2, 4)}`);
          }
        };

    async function criarRerserva(){

      //validação do horario aqui (do 0 a 24 horas e dos minutos é de 0 a 59)

      const partes = date.split('/');
      const dataFormatada = partes[2] + '/' + partes[1] + '/' + partes[0];

      const data_entrada=`${dataFormatada}T${horario}:00:00Z`

      const token = await AsyncStorage.getItem('token')

      const reserva= await api.post('restaurante/comanda/createComanda/reserva',{data_entrada},{
        headers:{
          Authorization:token
        }
      }).then(response => response.data)

      if(reserva.status=='success'){
          alert('Reserva finalizada ')
          navigation.navigate('buscaRestaurante')
      }
      


    }

   
    

  return (
    <View style={styles.container}>

      <View style={styles.paiLogoRegras}>
        <Image
          style={styles.logoRegras}
          source={require('../../assets/iconreserva.png')}
        />
      </View>

      <View style={styles.descricao}>
            <Text style={styles.descricaoText}>Descrição da reserva</Text>
      </View>

      <View style={styles.regrasTitulo}>
          <Text style={styles.regrasTexto}>Fique atento as seguintes regras:</Text>
      </View>

      <View style={styles.descricaoRegras}>

          <Text style={styles.textoRegras}>-Cumpra o horário de chegada para não perder sua reserva 
          (tolerância de: {tolerancia} min)</Text>

          <Text style={styles.textoRegras}>-Pagamento obrigatório de 50% do valor, sem devolução!</Text>

          <Text style={styles.textoRegras}></Text>
       </View>

          <View style={styles.viewData}>
            <Text style={styles.dataEhora}>Escolha o horário e data de chegada</Text>
          </View>

          <View style={styles.dataEhorario}>
              <View style={styles.dataView}>
                  <Text style={styles.dataTitulo}>Data</Text>
                    <Pressable onPress={showDatepicker} style={styles.inptData}>
                        <Text  style={styles.textDate}>{date.toLocaleDateString()}</Text>
                    </Pressable>
                        
                    {showDatePicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={onDateChange}
                        />
                    )}
              </View>

              <View style={styles.horarioView}>
                  <Text style={styles.horarioTitulo}>Horário</Text>
                  <TextInput 
                    style={styles.inptHora}
                     value={horario}
                     onChangeText={(text) => mudarHorario(text)}
                     keyboardType="numeric"
                     maxLength={5}
                   />

                </View>
          </View>


        <View style={styles.viewBtnConfirmar}>
          <Pressable style={styles.btnConfirmar} onPress={criarRerserva}>
            <Text style={styles.confirmar}>Confirmar</Text>
          </Pressable>
        </View>

      </View>

      );
  }

 