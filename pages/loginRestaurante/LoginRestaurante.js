import React,  {useState,useEffect} from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';
import{styles} from './styles'
import * as Font from 'expo-font';
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import api from "../../providers/api"
import AsyncStorage from '@react-native-async-storage/async-storage/lib/typescript';

export default function LoginRestaurante({navigation}) {

    const [fontLoaded, setFontLoaded] = useState(false);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

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


    async function Enviardados(){
      const usuario={email:email , senha:senha}
      const resposta= await api.post("restaurante/login",usuario)

      if(resposta.data.status=="success"){
            const token=resposta.data.token
            await AsyncStorage.setItem("token",token)
            navigation.navigate("PainelADM")
      }
      else{
        alert('Login incorreto')
      }

    }
    
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/palatosLogo.png')}
      />
      
      <Text style={styles.emailSenha}>Email</Text>
      <TextInput 
        style={styles.inputs} 
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.emailSenha}>Senha</Text>
      <TextInput 
        style={styles.inputs}
        value={senha}
        onChangeText={setSenha}
      />

      <Pressable
        style={styles.btnEntrar}
        onPress={Enviardados}
       >

        <Text style={styles.palavraEntrar}>Entrar</Text>
        
        </Pressable>

      
    </View>

    
  );
}
