import React, { useState, useEffect } from "react";
import { styles } from "./styles"
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView } from "react-native"
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import * as Font from 'expo-font';
import api from "../../providers/api"
import AsyncStorage from '@react-native-async-storage/async-storage';
import TelaErro from "../../components/TelaErro";


function CadastroCliente({ navigation }) {

  const [fontLoaded, setFontLoaded] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [dadosCadastrados, setDadosCadastrados] = useState([]);
  const [erro, setErro] = useState([]);



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


  function checkErrors() {

    let objErros = [
      { type: "nome", message: validateField(nome, "nome") },
      { type: "email", message: validateField(email, "email") },
      { type: "senha", message: validateField(senha, "senha", confirmarSenha) },
    ]
    setErro(objErros)
    return objErros.some(obj => obj.message != "")
  }

  function validateField(field, type, field2 = null) {
    if (field == "") {
      return "Este campo é obrigatório!"
    }
    switch (type) {
      case "nome":
        if (field.length < 5) {
          return "O nome deve ter no mínimo 5 caracteres!"
        }
        if (!field.contains(" ")) {
          return "Informe o nome completo."
        }
        break;
      case "email":
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2})?$/.test(field)) {
          return "E-mail inválido!"
        }
        break
        case "senha":
          if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/.test(field)) {
            return "A senha deve ter no mínimo 6 caracteres, ao menos uma letra maiúscula, uma letra minúscula e um número."
          }
          if (field != field2) {
            return "As senhas são diferentes."
          }
          break
      default:
        break;
    }
    return ""
  }


  const realizarCadastro = async () => {
    if (checkErrors()) return

    const dadosCadastro = {
      nome_completo: nome,
      email,
      senha,
    };

    const usuario = await api.post('users/newUser', dadosCadastro)
      .then(resposta => resposta.data)

    if (usuario.token) {
      await AsyncStorage.setItem("token", usuario.token)
      navigation.navigate('BuscaRestaurante')
    } else {
      alert("erro")

    }


  }

  return (

    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

      <View style={styles.containerCadastroCliente}>

        <View style={styles.titulo} >
          <Text style={styles.textoTitulo}>Faça seu cadastro:</Text>
        </View>

        <View style={styles.formularioCadastroCliente}>

          <View style={styles.inputsPar}>
            <Text style={styles.textoInput}>Nome Completo</Text>
            <TextInput
              style={styles.inputs}
              value={nome}
              onChangeText={setNome}
              accessibilityLabel="Nome completo:"
            />
            <TelaErro erro={erro} type={"nome"} width={"80%"} />
          </View>

          <View style={styles.inputsPar}>
            <Text style={styles.textoInput}>E-mail:</Text>
            <TextInput
              style={styles.inputs}
              value={email}
              onChangeText={setEmail}
              accessibilityLabel="E-mail:"
            />
            <TelaErro erro={erro} type={"email"} width={"80%"} />
          </View>

          <View style={styles.inputsPar}>
            <Text style={styles.textoInput}>Senha</Text>
            <TextInput
              style={styles.inputs}
              value={senha}
              onChangeText={setSenha}
              accessibilityLabel="Senha:"
              secureTextEntry
            />
            <TelaErro erro={erro} type={"senha"} width={"80%"} />
          </View>

          <View style={styles.inputsPar}>
            <Text style={styles.textoInput}>Confirmar Senha</Text>
            <TextInput
              style={styles.inputs}
              cursorColor={"#445A14"}
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              accessibilityLabel="Confirmar Senha:"
              secureTextEntry
            />
          </View>

        </View>


        <View style={styles.confirmar}>
          <TouchableOpacity style={styles.botaoConfirmar} onPress={realizarCadastro} role="button">

            <Text style={styles.textoBotaoConfirmar}>Criar conta</Text>

          </TouchableOpacity>

        </View>

        <TouchableOpacity style={styles.botaoJaTenhoCadastro} role="button" onPress={() => navigation.navigate("PagInicial")}>
          <Text style={styles.textoJaTenhoCadastro}>Já tenho cadastro...</Text>
        </TouchableOpacity>

      </View>

    </ScrollView>

  );



}

export default CadastroCliente