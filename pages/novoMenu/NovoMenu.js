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
import ImageTools from "../../providers/ImageTools";


const imageTools = new ImageTools()




async function createRestaurant(formData, file, navigation, menu, quantMesas) {   

    let token = await AsyncStorage.getItem("token")
    //let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpZFJlc3RhdXJhbnRlIjoxMCwiaWF0IjoxNjk5OTkyNDgyLCJleHAiOjIzMDQ3OTI0ODJ9.Tgy9ZMee8Y1cYInLQfM7AOts9ftcHWftwpv5x46Hcvc"

    console.log(token)

    if (file) {

        if (file.uri.indexOf("data:") == -1) return

        const {extension, uri, type} = file
        
        let blob
        try {
            blob = imageTools.base64toBlob(uri, type)
        } catch (err) {
            console.log(`Erro ao converter para binário`, err)
            alert(`Erro ao converter para binário: ${err}`)
        }

        formData.append('file', blob, `.${extension}`)

    } 
    
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

   async function destroy() {
    
        isDeleted = true
        const params = {
            pratos: pratosCriados
        }
        await api.delete('/restaurante/cardapio/delete', {
            headers: {
                Authorization: token
            },
            params: params
        })

   }
  
    for (let i = 0; i < menu.length; i++) {

        const menuItem = menu[i]
        const { extension, uri, type } = menuItem.file
        const formDataMenu = new FormData()
     
        formDataMenu.append('nome', menuItem.nome)
        formDataMenu.append('descricao', menuItem.descricao)
        formDataMenu.append('preco', menuItem.preco)
        formDataMenu.append('tipo', menuItem.tipo)

        if (uri.indexOf("file:///") != -1) {

            formDataMenu.append('file', JSON.parse(JSON.stringify({
                name:`produto.${extension}`,
                uri: uri,
                type: type
            })))

        } else {

           try {

                const blobImage = imageTools.base64toBlob(uri, type)
                formDataMenu.append('file', blobImage, `.${extension}`)
                
            } catch (error) {
                console.log(error)
                alert("erro 1")
            } 

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

    createTables()
    async function createTables() {
        
        for (let i = 0 ; i < quantMesas ; i++) {

            const idRest = restaurante.resultRestaurant.id
            let mesa
            try {
                mesa = await api.post(`restaurante/mesa/add/${idRest}`, {}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                }).then(response => response.data.mesa)
    
            } catch (error) {
                console.log(error)
            }
            
        }
    }

    navigation.navigate("PainelADM", { restaurante, isDeleted })

}

function NovoMenu({navigation, route}) {

    const [fontLoaded, setFontLoaded] = useState(false);
    const [formRestaurante, setFormRestaurante] = useState("")
    const [file, setFile] = useState(null)
    const [quantMesas, setQuantMesas] = useState("0")
    const { menu, menuTools, userTools } = useFormTools()
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

            //const token = await AsyncStorage.getItem("token")
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzLCJpZFJlc3RhdXJhbnRlIjo5LCJpYXQiOjE3MDA3NjE0MzQsImV4cCI6MjMwNTU2MTQzNH0.Q0aXPW6s5zUYEgW7fe9SHmDHUgOGtUeYf__U4V3KSpU"

            if (!token) {
                return
            }
          
            const decoded = decode(token)
            let  idRestaurante = decoded.idRestaurante
            
            if (idRestaurante) {

                setIsEdit(true)

                const menuData = await api.get(`restaurante/cardapio/${idRestaurante}`)
                .then(response => response.data.menu)
               
                if (menuData.length == 0) {

                    menuTools.setNewMenu([{
                        id: 0,
                        nome: "",
                        descricao: "",
                        preco: "",
                        foto: "",
                        file: "",
                        tipo: "Categoria"
                    }])

                } else {

                    const cardapio = []

                    for (let produto of menuData) {

                        const obj = {
                            id: produto.codigo,
                            nome: produto.nome_produto,
                            descricao: produto.descricao,
                            preco: produto.preco,
                            foto: produto.foto,
                            nomeImagem: "",
                            file: "",
                            tipo: produto.tipo
                        }

                        cardapio.push(obj)

                    }

                    
                    menuTools.setNewMenu(cardapio)

                }
            
            }

        }

        isEditOrNot()
        
        async function getParmsOrNot() {
        
            if (route.params) {
              
                const {formData, fotoRestaurante} = route.params;
                setFormRestaurante(formData)
                setFile(fotoRestaurante)
            } 
        }

        getParmsOrNot()
    }, []);

    async function editarMenu() {

        const isValid = {valid: true, erro: null}

        for (let produtoValidate of menu) {

            for (let prop in produtoValidate) {

                if (produtoValidate[prop] == "" && prop != "file") {

                    isValid.valid = false
                    isValid.erro = 'vazio'
                    
                }

                if (prop == 'preco') {

                    const valor = produtoValidate[prop]
                    const ultimoNumero = valor[valor.length - 1]

                    if (ultimoNumero == ".") {
                        produtoValidate[prop] = valor.slice(0, ultimoNumero)
                    }

                }

            }

        }

        if (!isValid.valid) {


            return
        }
        //const token = await AsyncStorage.getItem('token')
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzLCJpZFJlc3RhdXJhbnRlIjo5LCJpYXQiOjE3MDA4NDgwNjQsImV4cCI6MjMwNTY0ODA2NH0.nlkKW2D9YK43Ucn__peWj5hHHxtaDRfMqYT7fKKrDI0"
        await AsyncStorage.setItem('token', token)

        for (let produto of menu) {

            const formData = new FormData()

            formData.append('nome', produto.nome)
            formData.append('descricao', produto.descricao)
            formData.append('tipo', produto.tipo)
            formData.append('preco', produto.preco)

            if (produto.file) {

                const { uri, type} = produto.file
                
                formData.append('file', JSON.parse(JSON.stringify({
                    name: 'produto',
                    uri: uri,
                    type: type
                })))

            }

            try {
                
                await api.put("/restaurante/cardapio/edit/" + produto.id, formData, {
                    headers: {
                        "Authorization": token,
                        "Content-Type": "multpart/form-data"
                    }
                })
               

            } catch (error) {

                console.log("erro ao editar menu: " + error)
                
            }

        }

        navigation.navigate("PainelADM")
    
    }

    if (!fontLoaded) {
        return null; 
    }

    return(
        <View style={styles.containerNovoMenu}>
            <BotaoVoltar onPress={() => navigation.goBack()}/>
            <MiniLogo />
            {
                !isEdit && (
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
                )
            }

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
                {
                    isEdit ? (
                        <Pressable style={styles.btnFinalizarMenu} accessibilityRole="button" onPress={editarMenu}>
                            <Text style={styles.textFinalizarMenu}>Editar Menu</Text>
                        </Pressable>
                    ) : (
                        <Pressable style={styles.btnFinalizarMenu} accessibilityRole="button" onPress={() => createRestaurant( formRestaurante, file, navigation, menu, quantMesas)}>
                            <Text style={styles.textFinalizarMenu}>Finalizar Menu</Text>
                        </Pressable>
                    )
                    
                }
            </View>
        </View>
    );

}

export default NovoMenu