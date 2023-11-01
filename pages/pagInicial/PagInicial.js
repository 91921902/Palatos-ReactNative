
import React, { useState, useEffect } from "react";
import { styles } from "./styles";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import fontKavoon from "../../assets/fonts/kavoon.ttf";
import fontLemonada from "../../assets/fonts/lemonada.ttf";
import * as Font from 'expo-font';


function PagInicial() {
  // Estado para verificar se as fontes foram carregadas
  const [fontLoaded, setFontLoaded] = useState(false);

  // Estados para armazenar o email e a senha digitados pelo usuário
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

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
    if (!email || !senha) {
      return;
    }

    try {
      // Simulando uma solicitação POST para o backend com as credenciais
      // Substitua esta parte pelo código de solicitação real para o seu backend
      // Aqui estamos apenas simulando um objeto de usuário com email e senha
      const user = { email, senha };

      // Adiciona os dados do usuário ao userList
      setUserList([...userList, user]);

      console.log('User List:', userList);

      // Redireciona o usuário para a tela inicial do aplicativo
      // (usando a navegação do React Navigation, por exemplo)
    } catch (error) {
      // Lidar com erros de conexão, etc.
      console.log('erro')
    }
  };

  return (
    <View style={styles.containerPagInicial}>
      <View style={styles.loginRestaurante}>
        <TouchableOpacity style={styles.botaoLogin}>
          <Text style={styles.textoBotaoLogin}>Login restaurante</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logo}>
        <Image source={require("../../assets/logo-texto.png")} style={styles.logoTexto} />
      </View>

      <View style={styles.formularioPagInicial}>
        <View style={styles.inputsFormulario}>
          <Text style={styles.textoInput}>Email</Text>
          {/* Campo de entrada de email */}
          <TextInput style={styles.input} onChangeText={text => setEmail(text)} value={email} />
        </View>

        <View style={styles.inputsFormulario}>
          <Text style={styles.textoInput}>Senha</Text>
          {/* Campo de entrada de senha */}
          <TextInput style={styles.input} onChangeText={text => setSenha(text)} value={senha} />
        </View>
      </View>

      <View style={styles.entrar}>
        <TouchableOpacity style={styles.botaoEntrar} onPress={handleLogin}>
          <Text style={styles.textoBotaoEntrar}>Entrar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cadastro}>
        <TouchableOpacity style={styles.botaoCadastro}>
          <Text style={styles.textoCadastro}>Não tenho cadastro...</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PagInicial;