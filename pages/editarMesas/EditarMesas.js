import React from "react"
import api from "../../api/axios"
import { useEffect } from "react"
import { Image, View, Text, ScrollView, TextInput, Animated, Easing, Pressable } from "react-native"
import { useState } from "react"
import { styles } from "./styles"
import BotaoVoltar from "../../components/BotaoVoltar.js"
import ItemMesa from "../../components/ItemMesa.js"



/* - COPIAR ISSO PARA USAR A FONT PERSONALIZADA - */

import * as Font from 'expo-font';
import fontLemonada from "../../assets/fonts/lemonada.ttf"


function EditarMesa() {


    const [mesas, setMesas] = useState([])
    const [fontLoaded, setFontLoaded] = useState(false);


    useEffect(() => {
        async function carregaMesas() {
            //Tem que puxar do backend, fim do mundo
            let listaMesas = [
                {
                    id: 1,
                    ocupada: false,
                    identificacao_mesa: "Mesa 1",
                    qrCode: "https://img.freepik.com/fotos-gratis/lindo-cavalo-castanho_144627-19417.jpg?size=626&ext=jpg"
                },
                {
                    id: 2,
                    ocupada: true,
                    identificacao_mesa: "Mesa 2",
                    qrCode: "https://img.freepik.com/fotos-gratis/cavalo-correndo-pela-velha-paisagem-ocidental_23-2150527864.jpg?size=626&ext=jpg"
                },
                {
                    id: 3,
                    ocupada: false,
                    identificacao_mesa: "Mesa 3",
                    qrCode: "https://img.freepik.com/fotos-premium/conjunto-de-animais-europeus-pintados-com-aquarelas-sobre-fundo-branco-de-maneira-realista-multicolorido-e-iridescente-ideal-para-materiais-didaticos-livros-e-designs-com-temas-da-natureza-criados-por-ia_259452-1887.jpg?size=626&ext=jpg"
                },
            ]
            setMesas(listaMesas)
        }
        async function loadFonts() {
            await Font.loadAsync({
                'lemonada': fontLemonada,
            });
            setFontLoaded(true);
        }

        loadFonts();
        carregaMesas()
    }, []);

    if (!fontLoaded) {
        return null;
    }


    return (
        <View>
            {/* <BotaoVoltar /> */}
            <ScrollView style={{ height: "60%" }}>
                {mesas.length > 0 ? (
                    mesas.map((obj, key) => (
                        <ItemMesa key={key} tipoMenu={2} idMesa={obj.id} ocupada={obj.ocupada} qrCode={obj.qrCode} />
                    ))
                ) : (
                    <View></View>
                )
                }
            </ScrollView>
        </View>
    );

}

export default Mesas