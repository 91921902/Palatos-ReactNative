import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles"

function CadastroCliente() {


    return(
   
        <View style={styles.container}>

        <View style={styles.titulo} >
          <Text style={styles.textoTitulo}>Faça seu cadastro:</Text>
        </View>
  
        <View style={styles.formulario}>
  
          <Text style={styles.textoInput}>Email</Text>
          <TextInput style={styles.inputs}
  
          />
  
          <Text style={styles.textoInput}>Senha</Text>
          <TextInput style={styles.inputs}
  
          />
  
          <Text style={styles.textoInput}>Confirmar Senha</Text>
          <TextInput style={styles.inputs}
  
          />
        </View>
  
        
        <View style={styles.confirmar}>
          <TouchableOpacity style={styles.botao}>
  
           <Text style={styles.textoBotao}>Confirmar</Text>
  
          </TouchableOpacity>
          
        </View>
  
  
  
      </View>
  
    );

    

}

export default CadastroCliente