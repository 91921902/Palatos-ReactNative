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
import BotaoCarrinho from '../../components/CarrinhoIcon';



export default function MenuIndividual({navigation, route}) {
    const [fontLoaded, setFontLoaded] = useState(false);
    const [observacoes, setObservacoes] = useState('');
    const [quantidade, setQuantidade] = useState(1);
    const [valoresEnviados, setvaloresEnviados] = useState("");
    const [nomePrato, setNomePrato]=useState("");
    const [descricao, setDescricao]=useState("");
    const [preco, setPreco]=useState(0);
    const [foto, setFoto]=useState("");
    const [isCarrinho, setIsCarrinho]= useState(false);

    const {idRest} = route.params;


    async function enviarParaCarrinhoOuNao(){

        if(isCarrinho){
            const {idProduto}=route.params
            const idMesa= await AsyncStorage.getItem("mesa")
            const result = await api.post("/users/carrinhoMesa/deleteItem/"+ idMesa, {
                idProduto:idProduto
            })

            if(result.data.status!='success'){
                console.log("erro ao remover item do carrinho")
            }

        } else{

            const idMesa= await AsyncStorage.getItem("mesa")
            const {idProduto}=route.params

            const req={
                observacoes:observacoes,
                quantidade:quantidade,
                idProduto,
                idMesa:Number(idMesa)
            }

            const result= await api.post("/users/carrinhoMesa/addItem",req)

            if(result.data.status=="success"){
                setIsCarrinho(true)
            }
        }
    };

    const aumentarNumero = () => {
        if(quantidade > 29) return
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
            const {id} = route.params
          
            try {
                 
                const resultado= await api.get(`restaurante/cardapio/prato/${id}`)
                .then(result => result.data.produto)
                setNomePrato(resultado.nome_produto)
                setDescricao(resultado.descricao)
                setPreco(resultado.preco)
                setFoto(resultado.foto)

            } catch (error) {
                alert("erro1")
                console.log(error)
            }
            
            const idMesa= await AsyncStorage.getItem("mesa")
            

            try {   
                
                let carrinho

                if (idMesa) {

                    carrinho = await api.get('/users/carrinhoMesa/getAll/' + idMesa)
                    .then(result => result.data.carrinho)

                } else {

                    

                    carrinho = await api.get('/users/carrinhoReserva/getAll/' + idRest)
                    .then(result => result.data.carrinho)

                }

                

                function filtrarPorId(carrinho, idDesejado) {
                    return carrinho.filter(produto => produto.id == idDesejado);
                }
                const {idProduto}=route.params
                const recebeItemOuNao= filtrarPorId(carrinho,idProduto)

                if(recebeItemOuNao){
                    setIsCarrinho(true)
                }

            } catch (error) {

                if (idMesa) {
                    console.log(error)
                }
                
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
                <BotaoVoltar onPress={() => {navigation.goBack()}}/>
                <BotaoCarrinho onPress={() => {navigation.navigate("Pedidos", {idRest})}}/>




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
                    <Pressable style={styles.btnCarrinho} onPress={enviarParaCarrinhoOuNao}>
                            {
                                isCarrinho ? (
                                    <Text style={styles.textoCarrinho}>Remover do carrinho</Text>
                                ) : (
                                    <Text style={styles.textoCarrinho}>Enviar para o carrinho</Text>
                                )
                            }
                    </Pressable>
                </View>


            </View>
        </ScrollView>
    );
}