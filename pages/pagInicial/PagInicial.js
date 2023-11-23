import A11y from "../../providers/A11y"
import React, { useState, useEffect } from "react";
import { styles } from "./styles";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import fontKavoon from "../../assets/fonts/kavoon.ttf";
import fontLemonada from "../../assets/fonts/lemonada.ttf";
import * as Font from 'expo-font';
import api from "../../providers/api"
import AsyncStorage from '@react-native-async-storage/async-storage';
import TelaErro from "../../components/TelaErro";

function PagInicial({ navigation }) {
  // Estado para verificar se as fontes foram carregadas
  const [fontLoaded, setFontLoaded] = useState(false);

  // Estados para armazenar o email e a senha digitados pelo usuário
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState([
    {type: "email", message: ""},
    {type: "senha", message: ""}
  ])
  // Estado para armazenar os dados do usuário em um array
  const [userList, setUserList] = useState([]);


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

  // Função para lidar com o login
  const handleLogin = async () => {
    // Verifica se o email ou senha estão em branco
    let isError = false
    let objErros = [...erro]


      let objErro = objErros.find(err => err.type == "senha")
      if (!senha) {
        isError = true
        objErro.message = "Este campo é obrigatório!"
      } else {
        objErro.message = ""
    }

      objErro = objErros.find(err => err.type == "email")
      if(!email) {
        objErro.message = "Este campo é obrigatório!"
        isError = true
      } else {
        objErro.message = ""
        isError = false
    }

    //a ultima condicao tem prioridade por algum motivo ai

    setErro(objErros)
    if (isError) {
      return
    }
    try {
      let lista = [...erro]
      for(let obj of lista) {
        obj.message = ""
      }
      setErro(lista)
      const user = { email, senha };

      const usuario = await api.post("users/login", user)
        .then(response => response.data)

      if (usuario.token) {
        await AsyncStorage.setItem("token", usuario.token)
        navigation.navigate('BuscaRestaurante')
      } else {
        alert("erro")

      }

    } catch (error) {

      console.log('erro')
    }
  };

  function clearError() {

    if (erro.length == 0) return

    //essa condicao ta errada

    setErro([])
  }

  return (
    <View style={styles.containerPagInicial} onTouchStart={clearError}>
      <View style={styles.loginRestaurante}>
        <TouchableOpacity style={styles.botaoLogin} onPress={() => navigation.navigate("LoginRestaurante")}>
          <Text style={styles.textoBotaoLogin}>Login restaurante</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logo}>
        <Image source={require("../../assets/logo-texto.png")} style={styles.logoTexto} />
      </View>

      <View style={styles.formularioPagInicial}>
        <View style={styles.inputsFormulario}>
          <Text style={styles.textoInput}>E-mail</Text>

          <TextInput style={styles.input} onChangeText={setEmail} value={email} accessibilityLabel="E-mail" />
          <TelaErro type={'email'} width={"80%"} erro={erro} field={email}/>

        </View>

        <View style={styles.inputsFormulario}>
          <Text style={styles.textoInput}>Senha</Text>

          <TextInput style={styles.input} onChangeText={setSenha} value={senha} accessibilityLabel="Senha:" />
          <TelaErro type={'senha'} width={"80%"} erro={erro} />

        </View>
      </View>

      <View style={styles.entrar}>
        <TouchableOpacity style={styles.botaoEntrar} onPress={handleLogin} {...A11y.role("button")}>
          <Text style={styles.textoBotaoEntrar}>Entrar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cadastro}>
        <TouchableOpacity style={styles.botaoCadastro} onPress={() => { navigation.navigate("CadastroCliente") }} {...A11y.role("button")}>
          <Text style={styles.textoCadastro}>Não tenho cadastro...</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PagInicial;