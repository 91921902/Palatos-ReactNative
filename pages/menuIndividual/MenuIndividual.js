import React, { useState, useEffect } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import { styles } from './styles'
import * as Font from 'expo-font';
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import MiniLogo from '../../components/MiniLogo';
import BotaoVoltar from '../../components/BotaoVoltar';
import api from "../../providers/api"
import AsyncStorage from '@react-native-async-storage/async-storage/lib/typescript';
import jwtDecode from 'jwt-decode';


export default function MenuIndividual({navigation}) {
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
            const token= await AsyncStorage.getItem("token")

            try {
                    const decode = jwtDecode(token)
                    const resultado= await api.get(`restaurante/cardapio/${decode.idRestaunte}`)
                    setNomePrato(resultado.data.nome_produto)
                    setDescricao(resultado.data.descricao)
                    setPreco(resultado.data.preco)
                    setFoto(resultado.data.foto)
            
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
        <ScrollView style={styles.scroll}>

            <View style={styles.container}>
                <MiniLogo />
                <BotaoVoltar />



                <View style={styles.caixaFoto}>

                    <View style={styles.foto}>
                    <Image
                        source={{uri:foto}}
                        style={styles.fotoProduto}
                        />
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

                <View>
                    <TextInput style={styles.inpObs}
                        placeholder='   Ex: Tirar cebola, tirar salada...'
                        placeholderTextColor={'#92A14D'}
                        value={observacoes}
                        onChangeText={setObservacoes}
                    />

                    <Text style={styles.excluirAlgo}></Text>
                </View>



                <View style={styles.icones}>
                    <View style={styles.numero}>
                        <Text style={styles.numeros}>Quantidade: {quantidade}</Text>
                    </View>

                    <Pressable onPress={aumentarNumero}>
                        <Image
                            source={require('../../assets/mais 1.png')}
                            style={{ width: 31, height: 34, }}
                        />
                    </Pressable>

                    <Pressable onPress={diminuirNumero} >
                        <Image
                            source={require('../../assets/menos 1.png')}
                            style={{ width: 31, height: 34, }}
                        />
                    </Pressable>
                </View>

                <View style={styles.valorView}>
                    <Text style={styles.valor}>R$ {preco}</Text>
                </View>

                <View style={styles.carrinhoView}>
                    <Pressable style={styles.btnCarrinho}>
                        <Text style={styles.textoCarrinho}>Enviar para o carrinho</Text>
                    </Pressable>
                </View>


            </View>
        </ScrollView>
    );
}