import React, { useState, useEffect } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { styles } from './styles'
import * as Font from 'expo-font';
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import api from "../../providers/api"
import AsyncStorage from "@react-native-async-storage/async-storage";
import BotaoHome from '../../components/BotaoHome';
import TelaErro from '../../components/TelaErro';

export default function LoginRestaurante({ navigation }) {

  const [fontLoaded, setFontLoaded] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState([
    { type: "email", message: "" },
    { type: "senha", message: "" },
    { type: "email_senha", message: "" }
  ])

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


  async function Enviardados() {

    const erros = checkErrors()

    if (erros) {

      return
    }

    // Se o email e a senha estiverem corretos, continua com o envio dos dados
    const usuario = { email: email, senha: senha };
    let resposta

    try {
      resposta = await api.post("restaurante/login", usuario);
    } catch (error) {

      if (error.request.status == 401) {

        setErro([
          { type: "email", message: validateField(email, "email")},
          { type: "senha", message: validateField(email, "email")},
          { type: "email_senha", message: "Email ou Senha incorretos."}
        ])
        
      }

    }

    if (resposta.data.status === "success") {
      const token = resposta.data.token;
      await AsyncStorage.setItem("token", token);
      navigation.navigate("PainelADM");

    }

  }

  function checkErrors() {

    let objErros = [
      { type: "email", message: validateField(email, "email") },
      { type: "senha", message: validateField(senha, "senha") },
      { type: "email_senha", message: ""}
    ]
    setErro(objErros)
    return objErros.some(obj => obj.message != "")
  }

  function validateField(field, type) {
    if (field == "") {
      return "Este campo é obrigatório!"
    }
    switch (type) {
      
      case "email":
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2})?$/.test(field)) {
          return "E-mail inválido!"
        }
        break

      case "senha":
          if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/.test(field)) {
            return "Senha inválida."
          }
          break
      default:
        break;
    }
    return ""
  }


  return (
    <View style={styles.container}>

      <BotaoHome onPress={() => navigation.navigate("BuscaRestaurante")} />

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
        cursorColor={"#445A14"}
      />
      <TelaErro erro={erro} type={"email"} width={"80%"} />

      <Text style={styles.emailSenha}>Senha</Text>
      <TextInput
        style={styles.inputs}
        value={senha}
        accessibilityLabel='Senha'
        onChangeText={setSenha}
        cursorColor={"#445A14"}
        secureTextEntry

      />
      <TelaErro erro={erro} type={"senha"} width={"80%"} />
      <TelaErro erro={erro} type={"email_senha"} />

      <Pressable
        style={styles.btnEntrar}
        role='button'
        onPress={Enviardados}
      >

        <Text style={styles.palavraEntrar}>Entrar</Text>

      </Pressable>
      <View style={styles.boxSemCadastro}>
        <Pressable onPress={() => navigation.navigate("NovoCadastro")}>
          <Text style={styles.textSemCadastro}>Cadastrar restaurante...</Text>
        </Pressable>
      </View>
      


    </View>


  );
}
