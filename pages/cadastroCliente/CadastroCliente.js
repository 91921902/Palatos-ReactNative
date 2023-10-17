import React,{useState,useEffect} from "react";
import { styles } from "./styles"
import {  View, Text, TextInput, TouchableOpacity } from "react-native"
import MiniLogo from "../../components/MiniLogo";
import BotaoVoltar from "../../components/BotaoVoltar";
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import * as Font from 'expo-font';

  
function CadastroCliente() {
 
  const [fontLoaded, setFontLoaded] = useState(false);

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
    return(
   
        <View style={styles.containerCadastroCliente}>
{/* <MiniLogo/> */}
{/* <BotaoVoltar/> */}
        <View style={styles.titulo} >
          <Text style={styles.textoTitulo}>Faça seu cadastro:</Text>
        </View>
  
        <View style={styles.formularioCadastroCliente}>
          
          <View style={styles.inputsPar}>
            <Text style={styles.textoInput}>Email</Text>
            <TextInput style={styles.inputs}/>
         </View>

          <View style={styles.inputsPar}>
            <Text style={styles.textoInput}>Senha</Text>
            <TextInput style={styles.inputs}/>
          </View>
           
           <View style={styles.inputsPar}>
              <Text style={styles.textoInput}>Confirmar Senha</Text>
              <TextInput style={styles.inputs} cursorColor = {"#445A14"}/>
           </View>

        </View>
  
        
        <View style={styles.confirmar}>
          <TouchableOpacity style={styles.botaoConfirmar}>
  
           <Text style={styles.textoBotaoConfirmar}>Confirmar</Text>
  
          </TouchableOpacity>
          
        </View>
  
  
  
      </View>
  
    );

    

}

export default CadastroCliente