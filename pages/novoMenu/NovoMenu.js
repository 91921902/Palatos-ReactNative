import React, {useState, useEffect} from "react";
import { Text, TextInput, View, ScrollView, Pressable, Image } from "react-native";
import { styles } from "./styles"
import BotaoVoltar from "../../components/BotaoVoltar";
import MiniLogo from "../../components/MiniLogo";
import * as Font from 'expo-font';
import fontKavoon from "../../assets/fonts/kavoon.ttf"
import fontLemonada from "../../assets/fonts/lemonada.ttf"
import ItemMenu from "../../components/ItemMenu";
import { useFormTools } from "../../providers/FormRestContext";
import api from "../../providers/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import decode from "jwt-decode"
import QRCode from "react-native-qrcode-svg";
import ImageTools from "../../providers/ImageTools";

const imageTools = new ImageTools()


async function createRestaurant(formData, navigation, menu, quantMesas) {   

    //let token = await AsyncStorage.getItem("token")
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpZFJlc3RhdXJhbnRlIjoxMCwiaWF0IjoxNjk5OTkyNDgyLCJleHAiOjIzMDQ3OTI0ODJ9.Tgy9ZMee8Y1cYInLQfM7AOts9ftcHWftwpv5x46Hcvc"
    
    const novoRestaurante = await api.post("/restaurante/add", formData, 
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": "Bearer " + token
            }
        }
    )

    token = novoRestaurante.data.token

    await AsyncStorage.setItem("token", token)

    const restauranteData = novoRestaurante.data

    createMenu(token, navigation, restauranteData, menu, quantMesas)
}

async function createMenu(token, navigation, restaurante, menu, quantMesas) {

   
   const pratosCriados = []
   let isDeleted = false

   function destroy() {
        isDeleted = true
        api.delete('/restaurante/cardapio/deletePratosCriados', pratosCriados)

   }
  
    for (let i = 0; i < menu.length; i++) {

        const menuItem = menu[i]
        const { extension, uri, type } = menuItem.file
        const formDataMenu = new FormData()
     
        formDataMenu.append('nome', menuItem.nome)
        formDataMenu.append('descricao', menuItem.descricao)
        formDataMenu.append('preco', menuItem.preco)
        formDataMenu.append('tipo', menuItem.tipo)
        let blobImage

        try {
            blobImage = imageTools.base64toBlob(uri, type)
            formDataMenu.append('file', blobImage, `.${extension}`)

        } catch (error) {
            console.log(error)
            alert("erro 1")
        }
      
        const pratoCriado = await api.post("/restaurante/cardapio/add", formDataMenu, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': token
            }
        })

        if (pratoCriado.data.status != "success") {
            destroy()
            alert("ERRO: pratos deletados")
            return
        }

        pratosCriados.push(pratoCriado.data.produto.codigo)
     
    }

    async function createTables() {

        for (let i = 0 ; i < quantMesas ; i++) {

            const idRest = restaurante.resultRestaurant.id
            let mesa
            try {
                mesa = await api.post(`restaurante/mesa/add/${idRest}`, {
                    headers: {
                        Authorization: token
                    }
                }).then(response => response.data.mesa)
    
                await api.post(`restaurante/listaMesa/add`,{
                    idMesa: mesa.id,
                    idRestaurante: idRest
                } ,{
                    headers: {
                        Authorization: token
                    }
                })
            } catch (error) {
                alert("erro 2")
            }

            const jsonMesa = JSON.stringify({
                idRestaurante: idRest,
                idMesa: mesa.id
            })

            const qrcode = `data:image/png;base64,${QRCode.toDataURL(jsonMesa)}`
            const formData = new FormData()
            
            try {
                const blob = imageTools.base64toBlob(qrcode)
                formData.append('file', blob, `.png`)

            } catch (error) {
                console.log(error)
                alert("erro 3")
            }

            try {
                await api.post(`restaurante/mesa/addQrCode/${mesa.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': token
                    }
                })
            } catch (error) {
                alert("erro 9")
            }
            
        }
    }

    //createTables()

    navigation.navigate("PainelADM", { restaurante, isDeleted })

}

function NovoMenu({navigation, route}) {

    const [fontLoaded, setFontLoaded] = useState(false);
    const [formRestaurante, setFormRestaurante] = useState("")
    const [file, setFile] = useState(null)
    const [quantMesas, setQuantMesas] = useState("0")
    const { menu, menuTools } = useFormTools()
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        async function loadFonts() {
        await Font.loadAsync({
            'kavoon': fontKavoon,
            'lemonada': fontLemonada,
        });
        setFontLoaded(true);
        }

        loadFonts();

        async function isEditOrNot() {

            const token = await AsyncStorage.getItem("token")
          
            const decoded = decode(token)
            let  idRestaurante = decoded.idRestaurante
            
            if (idRestaurante) {

                setIsEdit(true)

                const menu = await api.get(`restaurante/cardapio/${idRestaurante}`)

                menuTools.setNewMenu(menu || [])
            
            }

        }

        isEditOrNot()
        
        async function getParmsOrNot() {
            

            if (route.params) {
              
                const {formData, file} = route.params;
                setFormRestaurante(formData)
                
            } else {
               
                const token = await AsyncStorage.getItem("token")

                if (!token) {
                    navigation.navigate("PagInicial")
                }

                const decoded = decode(token)

                const {idRestaurante} = decoded

                const restauranteData = await api.get("/restaurante/"+idRestaurante)

                const restaurante = restauranteData.data.resultRestaurant

                if (!restaurante) return

                const pratos = await api.get(`/cardapio/${idRestaurante}`)

                menuTools.setNewMenu(pratos.data.menu)

            }
        }

        getParmsOrNot()
    }, []);

    if (!fontLoaded) {
        return null; 
    }

    return(
        <View style={styles.containerNovoMenu}>
            <BotaoVoltar onPress={() => navigation.goBack()}/>
            <MiniLogo />
            <View style={styles.boxQuantMesas}>
                <Text style={styles.textQuantMesas} accessibility={false} aria-hidden>Quantidade de mesas do seu Restaurante:</Text>
                <TextInput 
                    keyboardType="numeric"
                    style={styles.inputQuantMesas}
                    cursorColor={"#92A14D"}
                    accessibilityLabel="Quantidade de mesas do seu restaurante"
                    value={quantMesas}
                    onChangeText={setQuantMesas}
                />
            </View>
            <View style={styles.titleMenu}>
               <Text style={styles.textTitleMenu}>Faça seu Menu:</Text>
            </View>
            <ScrollView style={{width: "100%",height: "50%"}}>
                <View style={styles.menuItens}>

                    {
                        menu.map((item, index) => {
                            return(
                                <ItemMenu key={item.id} item={item} id={item.id} index={index} isEdit={isEdit}/> 
                            );
                        })
                    }

                </View>
            </ScrollView>
            <View style={styles.boxFinalizarMenu}>
                <Pressable style={styles.btnFinalizarMenu} accessibilityRole="button" onPress={() => createRestaurant( formRestaurante, navigation, menu, quantMesas)}>
                    
                    {isEdit && <Text style={styles.textFinalizarMenu}>Editar Menu</Text>}
                    {!isEdit && <Text style={styles.textFinalizarMenu}>Finalizar Menu</Text>}
                </Pressable>
            </View>
        </View>
    );

}

export default NovoMenu