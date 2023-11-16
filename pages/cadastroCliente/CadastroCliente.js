import React,{useState,useEffect} from "react";
import { styles } from "./styles"
import {  View, Text, TextInput, TouchableOpacity } from "react-native"
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import * as Font from 'expo-font';
import api from "../../providers/api"
import AsyncStorage from '@react-native-async-storage/async-storage';
  
function CadastroCliente({navigation}) {
 
  const [fontLoaded, setFontLoaded] = useState(false);
  const[nome, setNome]=useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [dadosCadastrados, setDadosCadastrados] = useState([]);
  const [erro, setErro] = useState('');



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
    const realizarCadastro = async () => {
      // Implemente a validação dos campos (email, senha e confirmação de senha) aqui.
      // Se a validação for bem-sucedida, você pode adicionar os dados ao vetor dadosCadastrados.
  
      // Exemplo de validação:
      if (!email || !senha || !confirmarSenha) {
        alert('Preencha todos os campos.');
        return;
        
      }
  
      if (senha !== confirmarSenha) {
        alert('As senhas não coincidem.');
        return;
      }
  
      // Se a validação passar, você pode adicionar os dados ao vetor.
      const dadosCadastro = {
        email,
        senha,
      };

      const usuario = await api.post('users/newUser',dadosCadastro)
      .then(resposta => resposta.data)

      if (usuario.token){
         await AsyncStorage.setItem("token", usuario.token)
         navigation.navigate('BuscaRestaurante')
      }else{
        alert("erro")

      }
      
      setErro(''); // Limpa qualquer mensagem de erro anterior.
      
    }
    
   
      

    return(
   
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
            />
         </View>
          
          <View style={styles.inputsPar}>
            <Text style={styles.textoInput}>Email</Text>
            <TextInput 
            style={styles.inputs}
            value={email}
            onChangeText={setEmail}
            />
         </View>

          <View style={styles.inputsPar}>
            <Text style={styles.textoInput}>Senha</Text>
            <TextInput 
            style={styles.inputs}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            />
          </View>
           
           <View style={styles.inputsPar}>
              <Text style={styles.textoInput}>Confirmar Senha</Text>
              <TextInput 
              style={styles.inputs} 
              cursorColor = {"#445A14"}
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry
              />
           </View>

        </View>
  
        
        <View style={styles.confirmar}>
          <TouchableOpacity style={styles.botaoConfirmar}onPress={realizarCadastro}>
  
           <Text style={styles.textoBotaoConfirmar}>Confirmar</Text>
  
          </TouchableOpacity>
          
        </View>
  
        <TouchableOpacity style={styles.botaoJaTenhoCadastro} onPress={() => navigation.navigate("PagInicial")}>
            <Text style={styles.textoJaTenhoCadastro}>Já tenho cadastro...</Text>
        </TouchableOpacity>
  
      </View>
  
    );

    

}

export default CadastroCliente