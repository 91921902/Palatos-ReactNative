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
import BotaoVoltar from "../../components/BotaoVoltar"
import { useFormTools } from '../../providers/FormRestContext';

export default function DescricaoReserva({navigation}) {
    //precisa do idRestaurante, userId(para pegar o carrinho), idMesa(boa parte disso vai estar o asyncStorage)
    const [fontLoaded, setFontLoaded] = useState(false);
    const [tolerancia, setTolerancia]= useState(0);
    const [date,setDate]=useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [horario, setHorario] = useState('');
    const {carrinho, setNewCarrinho} = useFormTools()

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

      function validarHora(hora) {
        const partes = hora.split(':'); 
      
        if (partes.length === 2) {
          let horas = parseInt(partes[0], 10);
          let minutos = parseInt(partes[1], 10);
      
          if (!isNaN(horas) && !isNaN(minutos) && horas >= 0 && horas <= 23 && minutos >= 0 && minutos <= 59) {
           
            if (horas < 10) {
              horas = '0' + horas;
            }
      
            
            if (minutos < 10) {
              minutos = '0' + minutos;
            }

            return horas + ':' + minutos
  
          } else {
            
            alert('Formato de hora inválido.');
          }
        } else {
          
          alert('Formato de hora inválido.');
        }
      }

      const horaFormatada = validarHora(horario)

      let data = new Date(date).toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        
      }).replace(/\//g, '-');

      const data_entrada=`${data} ${horaFormatada}:00+00`

      const token = await AsyncStorage.getItem('token')

      const req = {
        pedido: carrinho,
        dataEntrada: data_entrada
      }

      const reserva= await api.post('restaurante/reserva/add',req,{
        headers:{
          Authorization:token
        }
      }).then(response => response.data)

      if(reserva.status=='success'){

          setNewCarrinho([])
          navigation.navigate('BuscaRestaurante')
          
      }
      


    }

   
    

  return (
    <View style={styles.container}>

      <BotaoVoltar onPress={navigation.goBack}/>

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
                     cursorColor={"#445A14"}
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

 