import React, { useState, useEffect } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, Pressable, ScrollView, Alert } from 'react-native';
import { styles } from './styles'
import * as Font from 'expo-font';
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import MiniLogo from '../../components/MiniLogo';
import BotaoVoltar from '../../components/BotaoVoltar';
import BolaFavoritos from '../../components/BolaFavoritos';
import api from '../../providers/api'
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BotaoDeslogar from '../../components/BotaoDeslogar';

export default function CadastroFavoritos({ navigation }) {
    const [fontLoaded, setFontLoaded] = useState(false);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [favoritos, setFavoritos] = useState([]);
    const [reservas, setReservas] = useState([]);

    

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                'kavoon': fontKavoon,
                'lemonada': fontLemonada,
            });
            setFontLoaded(true);
        }

        loadFonts();
        buscarDados();
    }, []);

    if (!fontLoaded) {
        return null;
    }

    async function buscarDados() {

        const token = await AsyncStorage.getItem('token')
        //const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpZFJlc3RhdXJhbnRlIjoxMCwiaWF0IjoxNjk5Mzg1NjU1LCJleHAiOjIzMDQxODU2NTV9.k_JNl5rBJuEs6lZBrUolAqmQA_SIriTBcYPtiTDMBpM'
        let id

        try {
            const decode = jwtDecode(token)
            id = decode.userId

        } catch (error) {
            navigation.navigate("")
            console.log(error)
        }

        const usuario = await api.get(`users/getUser/${id}`, {
            headers: {
                Authorization: token
            }
        })
        .then(response => response.data.usuario)

        setNome(usuario.nome)
        setEmail(usuario.email)
        setTelefone(usuario.tel)
        setFavoritos(usuario.favoritos)

        const reservasData = []

        for (let reserva of usuario.reservas) {

            let hora, data

            const dataFormat = new Date(reserva.data_entrada)

            data = dataFormat.toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });

            hora = dataFormat.toLocaleString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false 
            });

            const dataHora = `${data} | ${hora}`

            reservasData.push({
                cod: reserva.cod,
                data_entrada: dataHora
            })
        }

        setReservas(reservasData)

    }

    return (
        <ScrollView contentContainerStyle={styles.scroll}>

            <View style={styles.container}>

                <BotaoDeslogar navigation={navigation}/>
                <BotaoVoltar onPress={navigation.goBack}/>

                <View style={styles.fotoPessoa}>
                    <Image source={require("../../assets/user.png")} style={{ width: "100%", height: "100%" }} />
                </View>

                <View style={styles.nomeView}>
                    <Text style={styles.nome}>{nome}</Text>
                </View>


                <View style={styles.emailTelTexto}>
                    <View style={styles.direcaoEmailTel}>
                        <Text style={styles.emailEtel}>Email:</Text>
                        <Text style={styles.resposta}>{email}</Text>
                    </View>

                    <View style={styles.direcaoEmailTel}>
                        <Text style={styles.emailEtel}>Tel:</Text>
                        <Text style={styles.resposta}>{telefone}</Text>
                    </View>
                </View>

                <View >
                    <Text style={styles.favorito}>Favoritos</Text>
                </View>

                <ScrollView horizontal={true} style={styles.favoritosStar}>
                    {
                        favoritos.length > 0 && (
                            favoritos.map(favorito => {
                                return (
                                    <BolaFavoritos key={favorito.id_restaurante} restaurante={favorito} navigation={navigation} />
                                )
                            })
                        )
                    }

                </ScrollView>
                {
                    favoritos.length == 0 && (
                        <Text style={styles.notFavoritos}>Você ainda não possue favoritos :(</Text>
                    )
                }
                <View style={styles.reservaView}>
                    <Text style={styles.textoReserva}>Minhas reservas:</Text>
                </View>

                <View style={styles.visualizarReserva}>
                    <ScrollView>
                        {
                            reservas.map(reserva => {
                                return (
                                    <View key={reserva.cod} style={{
                                        borderBottomColor: "#445A14", 
                                        borderWidth: 1,
                                        paddingBottom: 10
                                    }}
                                    >
                                        <Text style={styles.reservaPessoa}>Código: {reserva.cod}</Text>

                                        <Text style={styles.reservaPessoa}>Data: {reserva.data_entrada} </Text>
                                    </View>
                                    
                                )
                            })
                        }
                    </ScrollView>
                </View>


            </View>
        </ScrollView>
    );
}