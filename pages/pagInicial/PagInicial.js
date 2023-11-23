
import React, { useState, useEffect } from "react";
import { styles } from "./styles";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import fontKavoon from "../../assets/fonts/kavoon.ttf";
import fontLemonada from "../../assets/fonts/lemonada.ttf";
import * as Font from 'expo-font';
import api from "../../providers/api"
import AsyncStorage from '@react-native-async-storage/async-storage';
import TelaErro from "../../components/TelaErro";

function PagInicial({navigation}) {
  // Estado para verificar se as fontes foram carregadas
  const [fontLoaded, setFontLoaded] = useState(false);

  // Estados para armazenar o email e a senha digitados pelo usuário
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState([{
    tipoInpt: "",
    tipoMessage: ""
  }])

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
    
   
    if (!senha) {
      let isExists = false
      for (let err of erro) {
        if (err.tipoInpt == 'senha') {
          isExists = true
          break
        }
      }

      if (isExists) return

      setErro([...erro, {
        tipoInpt: "senha",
        tipoMessage: "vazio"
      }])
      isError = true
    } 

    if (!email) {

      let isExists = false
      for (let err of erro) {
        if (err.tipoInpt == 'email') {
          isExists = true
          break
        }
      }

      if (isExists) return
  
      setErro([...erro, {
        tipoInpt: "email",
        tipoMessage: "vazio"
      }])
      isError = true
    }

    //a ultima condicao tem prioridade por algum motivo ai

    if (erro) {
      return
    }
    try {
      
      const user = { email, senha };
     
      const usuario = await api.post("users/login",user)
      .then(response => response.data)

      if (usuario.token){
        await AsyncStorage.setItem("token", usuario.token)
        navigation.navigate('BuscaRestaurante')
     }else{
       alert("erro")

     }

    } catch (error) {
      
      console.log('erro')
    }
  };

  function clearError() {

    if (erro[0].tipoInpt == "") return

    //essa condicao ta errada

    setErro([{
        tipoInpt: "",
        tipoMessage: ""
    }])
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
          <Text style={styles.textoInput}>Email</Text>
         
          <TextInput style={styles.input} onChangeText={setEmail} value={email} />
          <TelaErro tipo={'email'} width={"80%"} erro={erro}/>

        </View>

        <View style={styles.inputsFormulario}>
          <Text style={styles.textoInput}>Senha</Text>
         
          <TextInput style={styles.input} onChangeText={setSenha} value={senha} />
          <TelaErro tipo={'senha'} width={"80%"} erro={erro}/>

        </View>
      </View>

      <View style={styles.entrar}>
        <TouchableOpacity style={styles.botaoEntrar} onPress={handleLogin}>
          <Text style={styles.textoBotaoEntrar}>Entrar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cadastro}>
        <TouchableOpacity style={styles.botaoCadastro} onPress={() => {navigation.navigate("CadastroCliente")}}>
          <Text style={styles.textoCadastro}>Não tenho cadastro...</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PagInicial;