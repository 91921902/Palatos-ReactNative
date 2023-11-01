import React, { useState, useEffect } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import { styles } from './styles'
import * as Font from 'expo-font';
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import MiniLogo from '../../components/MiniLogo';
import BotaoVoltar from '../../components/BotaoVoltar';
import api from "../../providers/api"
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function MenuIndividual({navigation, route}) {
    const [fontLoaded, setFontLoaded] = useState(false);
    const [observacoes, setObservacoes] = useState('');
    const [quantidade, setQuantidade] = useState(1);
    const [valoresEnviados, setvaloresEnviados] = useState("");
    const [nomePrato, setNomePrato]=useState("");
    const [descricao, setDescricao]=useState("");
    const [preco, setPreco]=useState(0);
    const [foto, setFoto]=useState("");



    const aumentarNumero = () => {
        setQuantidade(quantidade + 1);
    };

    const diminuirNumero = () => {
        if(quantidade==1) return
        setQuantidade(quantidade - 1);
    };


    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                'kavoon': fontKavoon,
                'lemonada': fontLemonada,
            });
            setFontLoaded(true);
        }

        loadFonts();


        async function buscarDados(){
            const {id}=route.params

            try {
                    
                    const resultado= await api.get(`restaurante/cardapio/prato/${id}`)
                    .then(result => result.data.produto)
                    setNomePrato(resultado.nome_produto)
                    setDescricao(resultado.descricao)
                    setPreco(resultado.preco)
                    setFoto(resultado.foto)
                    console.log(resultado)
            
            } catch (error) {
                alert("erro")
            }
                
        }

           
        buscarDados()
       

    }, []);

    if (!fontLoaded) {
        return null;
    }


    return (
        <ScrollView contentContainerStyle={styles.scroll}>

            <View style={styles.container}>
                <MiniLogo />
                <BotaoVoltar />



                <View style={styles.caixaFoto}>

                    <View style={styles.foto}>
                        {foto && (
                            <Image
                        source={{uri:foto}}
                        style={styles.fotoProduto}
                        />
                        )}
                    
                    </View>

                </View>

                <View >
                    <Text style={styles.tituloDoPrato}>{nomePrato}</Text>
                </View>

                <View style={styles.descricaoView}>
                    <Text style={styles.descricao}>{descricao}</Text>
                </View>


                <View>
                    <Text style={styles.observacoes}>Observações:</Text>
                </View>

                <View style={{width:"100%",alignItems:'center'}}>
                    <TextInput style={styles.inpObs}
                        placeholder='   Ex: Tirar cebola, tirar salada...'
                        placeholderTextColor={'#92A14D'}
                        value={observacoes}
                        onChangeText={setObservacoes}
                        cursorColor={"black"}
                    />

                    <Text style={styles.excluirAlgo}></Text>
                </View>



                <View style={styles.icones}>
                    <View style={styles.numero}>
                        <Text style={styles.numeros}>Quantidade: {quantidade}</Text>
                    </View>

                    <Pressable onPress={aumentarNumero}>
                        <Image
                            source={require('../../assets/mais.png')}
                            style={{ width: 31, height: 34, resizeMode:'contain',marginRight:5}}
                        />
                    </Pressable>

                    <Pressable onPress={diminuirNumero} >
                        <Image
                            source={require('../../assets/menos.png')}
                            style={{ width: 31, height: 34, resizeMode:'contain' }}
                        />
                    </Pressable>
                </View>

               
                    <Text style={styles.valor}>R$ {preco}</Text>
              

                <View style={styles.carrinhoView}>
                    <Pressable style={styles.btnCarrinho}>
                        <Text style={styles.textoCarrinho}>Enviar para o carrinho</Text>
                    </Pressable>
                </View>


            </View>
        </ScrollView>
    );
}