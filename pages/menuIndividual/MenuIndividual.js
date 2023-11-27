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
import decode from 'jwt-decode'



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

            let cliente = await AsyncStorage.getItem("cliente")

            if (cliente) {
                
                const idProduto=route.params.id
                cliente = JSON.parse(cliente)

                const { idMesa } = cliente

                const result = await api.delete(`/users/carrinhoMesa/deleteItem/${idMesa}/${idProduto}`)
    
                if(result.data.status!='success'){
                    console.log("erro ao remover item do carrinho")
                } else {
                    setIsCarrinho(false)
                }
                
            } else {

                const idProduto=route.params.id
                const token = await AsyncStorage.getItem("token")

                try {
                    
                    await api.delete("users/carrinhoReserva/deleteItem/"+idProduto, {
                        headers: {
                            Authorization: token
                        }
                    })

                    setIsCarrinho(false)

                } catch (error) {
                    alert("erro em deletar o item")   
                }
            }

        } else{

            let cliente = await AsyncStorage.getItem("cliente")
            const idProduto=route.params.id

            if (cliente) {

                cliente = JSON.parse(cliente)
                const {idMesa} = cliente

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

            } else {

                const idProduto=route.params.id
                const token = await AsyncStorage.getItem("token")

                const req={
                    observacoes:observacoes,
                    quantidade:quantidade,
                    idProduto,
                }

                try {
                    
                    const response = await api.post("users/carrinhoReserva/addItem", req, {
                        headers: {
                            Authorization: token
                        }
                    }).then(response => response.data)

                    if (response.status == 'success') {

                        setIsCarrinho(true)

                    }

                } catch (error) {
                    alert("Erro ao adicionar ao carrinho")
                }
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
            
            let cliente = await AsyncStorage.getItem("cliente")
            

            try {   
                
                let carrinho

                if (cliente) {
                    cliente = JSON.parse(cliente)
                    const {idMesa} = cliente

                    carrinho = await api.get('/users/carrinhoMesa/getAll/' + idMesa)
                    .then(result => result.data.carrinho)

                } else {

                    const token = await AsyncStorage.getItem("token")
              
                    carrinho = await api.get('/users/carrinhoReserva/getAll/' + idRest, {
                        headers: {
                            Authorization: token
                        }
                    })
                    .then(result => result.data.carrinho)

                }

                

                function filtrarPorId(carrinho, idDesejado) {
                    return carrinho.filter(produto => produto.id == idDesejado);
                }
                const idProduto =route.params.id
                
                if (carrinho.length == 0) {

                    setIsCarrinho(false)

                } else {

                    const recebeItemOuNao= filtrarPorId(carrinho,idProduto)
                
                    if(recebeItemOuNao.length != 0){
                        setIsCarrinho(true)
                    }
                }
            } catch (error) {

                console.log(error)
                
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
                        multiline={true}
                        numberOfLines={5}
                        maxLength={186}
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