import React,{useState,useEffect} from "react";
import { styles } from "./styles"
import {  View, Text, TextInput, TouchableOpacity, Image, ScrollView } from "react-native"
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import * as Font from 'expo-font';
import ItemRestaurante from "../../components/ItemRestaurante";
import api from "../../providers/api";
import decode from "jwt-decode"
import AsyncStorage from "@react-native-async-storage/async-storage";


function BuscaRestaurante({navigation}) {
    const [fontLoaded, setFontLoaded] = useState(false);
    const [restaurantes, setRestaurantes] = useState([]);
    const [favoritos, setFavoritos] = useState([])

    useEffect(() => {
      async function loadFonts() {
        await Font.loadAsync({
          'kavoon': fontKavoon,
          'lemonada': fontLemonada,
        });
        setFontLoaded(true);
      }

      async function chamarRestaurantes(){

        let userId
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpZFJlc3RhdXJhbnRlIjoxMCwiaWF0IjoxNzAwMTY4MjI0LCJleHAiOjIzMDQ5NjgyMjR9.QVy4liUcrsNUA2NdVUUum3IcLyD5H7LKhlRoxuBKVp8'
        //const token = await AsyncStorage.getItem("token")

        try {
          const decoded = decode(token)
          userId = decoded.userId
        } catch (error) {
          alert("erro")
        }

        const dataRestaurantes= await api.get("restaurante")
        .then(result => result.data.result)

        const favoritosData = await api.get("users/getUser/"+userId, {
          headers: {
            Authorization: token
          }
        })
        .then(response => response.data.usuario.favoritos)

        setFavoritos([...favoritosData])
        setRestaurantes([...dataRestaurantes])

      }

      chamarRestaurantes()
      loadFonts();
    }, []);
  
    
  
    if (!fontLoaded) {
      return null;
    }
  
    return (
      <View style={styles.containerBuscaRestaurante}>
        <View style={styles.inicio}>
          <View style={styles.barraPesquisa}>
            <TextInput
              style={styles.restaurante}
              placeholder="Restaurante"
              placeholderTextColor={'#445A14'}
            />
            <View style={styles.barraPesquisa2}>
              <Image source={require('../../assets/lupa.png')} style={{ width: 20, height: 20, }} />
            </View>
          </View>
        </View>
        <ScrollView>
        <View style={styles.componente}>
            {restaurantes.map(restaurante => (
              <ItemRestaurante key={restaurante.id} rest={restaurante} favoritos={favoritos} navigation={navigation}/>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
  
  export default BuscaRestaurante