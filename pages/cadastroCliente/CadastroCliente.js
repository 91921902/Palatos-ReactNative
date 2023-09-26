import React from "react";
import { styles } from "./styles"
import {  View, Text, TextInput, TouchableOpacity } from "react-native"



  
function CadastroCliente() {



    return(
   
        <View style={styles.containerCadastroCliente}>

        <View style={styles.titulo} >
          <Text style={styles.textoTitulo}>Faça seu cadastro:</Text>
        </View>
  
        <View style={styles.formularioCadastroliente}>
  
          <Text style={styles.textoInput}>Email</Text>
          <TextInput style={styles.inputs}
  
          />
  
          <Text style={styles.textoInput}>Senha</Text>
          <TextInput style={styles.inputs}
  
          />
  
          <Text style={styles.textoInput}>Confirmar Senha</Text>
          <TextInput style={styles.inputs} cursorColor = {"#445A14"}
  
          />
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