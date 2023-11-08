import React,  {useState,useEffect} from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';
import{styles} from './styles'
import * as Font from 'expo-font';
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import api from "../../providers/api"
import AsyncStorage from "@react-native-async-storage/async-storage";

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

    const validateEmail = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    const validatePassword = () => {
      // A senha deve ter pelo menos 6 caracteres e conter pelo menos uma letra maiúscula
      return senha.length >= 6 && /[A-Z]/.test(senha);
    };


    async function Enviardados() {
      // Valida o email
      if (!validateEmail()) {
        alert('Email incorreto. Certifique-se de que o email contenha "@".');
        return;
      }
    
      // Valida a senha
      if (!validatePassword()) {
        alert('A senha deve ter pelo menos 6 caracteres e conter pelo menos uma letra maiúscula.');
        return;
      }
    
      // Se o email e a senha estiverem corretos, continua com o envio dos dados
      const usuario = { email: email, senha: senha };
      const resposta = await api.post("restaurante/login", usuario);
    
      if (resposta.data.status === "success") {
        const token = resposta.data.token;
        await AsyncStorage.setItem("token", token);
        navigation.navigate("PainelADM");
      } else {
        alert('Login incorreto');
      }
    }
    
    
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        accessibilityLabel='Logo Palatos'
        source={require('../../assets/palatosLogo.png')}
      />
      
      <Text style={styles.emailSenha}>E-mail</Text>
      <TextInput 
        style={styles.inputs} 
        value={email}
        accessibilityLabel='E-mail'
        onChangeText={setEmail}
      />

      <Text style={styles.emailSenha}>Senha</Text>
      <TextInput 
        style={styles.inputs}
        value={senha}
        accessibilityLabel='Senha'
        onChangeText={setSenha}
        secureTextEntry={true}
      />

      <Pressable
        style={styles.btnEntrar}
        role='button'
        onPress={Enviardados}
       >

        <Text style={styles.palavraEntrar}>Entrar</Text>
        
        </Pressable>

      
    </View>

    
  );
}
