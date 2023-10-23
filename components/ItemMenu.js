import React, {useState, useEffect, memo} from "react";
import * as Font from 'expo-font';
import fontKavoon from "../assets/fonts/kavoon.ttf"
import fontLemonada from "../assets/fonts/lemonada.ttf"
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, TextInput, StyleSheet, Pressable, Image, Platform } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { useFormTools } from "../providers/FormRestContext";


function ItemMenu({id, index}) {

    const [fontLoaded, setFontLoaded] = useState(false);
    const [nome, setNome] = useState("")
    const [desc, setDesc] = useState("")
    const [price, setPrice] = useState("")
    const [foto, setFoto] = useState("")
    const [file, setFile] = useState("")
    const [nomeImagem, setNomeImagem] = useState("")
    const [tipo, setTipo] = useState("Categoria")

    const [botaoCategorias, setBotaoCategorias] = useState({
        graus: "180",
        translate: -9,
        radius: 10,
        isActive: 0
    })
    
    const { menu, menuTools } = useFormTools()

    useEffect(() => { 

        let itemMenu

        for (let i = 0 ; i < menu.length ; i++) {

            if (menu[i].id == id) {
                itemMenu = menu[i]
                break
            }

        }
       
        const itemNow = {
            id: itemMenu.id,
            nome: nome,
            descricao: desc,
            preco: price,
            foto: foto,
            nomeImagem: nomeImagem,
            file: file,
            tipo: tipo
        }

        function setMenu() {
            
            menuTools.setItem({
                id: itemMenu.id,
                nome: nome,
                descricao: desc,
                preco: price,
                foto: foto,
                nomeImagem: nomeImagem,
                file: file,
                tipo: tipo
            })
        }

        function compareItens(item1, item2) {
           
            const keys1 = Object.keys(item1);
            const keys2 = Object.keys(item2);
          
            if (keys1.length !== keys2.length) {
                
              return false;
            }
          
            for (const key of keys1) {
              if (item1[key] !== item2[key]) {
                return false;
              }
            }
          
            return true;
          }

          if (!compareItens(itemMenu, itemNow)) {
            setMenu()
          }
          
          
    }, [nome, desc, price, foto, file, menu, tipo])

    useEffect(() => {
        async function loadFonts() {
        await Font.loadAsync({
            'kavoon': fontKavoon,
            'lemonada': fontLemonada,
        });
        setFontLoaded(true);
        }

        loadFonts();

        if (menu.length > 1) {
    
            const item = menu.filter(item => item.id == id)
    
            setNome(item.nome)
            setDesc(item.descricao)
            setPrice(item.preco)
            setFoto(item.foto)
            setFile(item.file)
            setNomeImagem(item.nomeImagem)
            setTipo(item.tipo)
        }

    }, []);

    if (!fontLoaded) {
        return null; 
    }

    function showOrHideCategory() {

        if (botaoCategorias.isActive == 0) {
            setBotaoCategorias({
                graus: "0",
                translate: 10,
                radius: 0,
                isActive: 1
            })
        } else {

            setBotaoCategorias({
                graus: "180",
                translate: -9,
                radius: 10,
                isActive: 0
            })

        }
    }


    const pickImage = async () => {
        
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
            setFoto(result.assets[0].uri);

            const fileName = result.assets[0].uri.substring(result.assets[0].uri.lastIndexOf("/") + 1, result.assets[0].uri.length)
            const fileType = fileName.split(".")[1]
            
            const image = {
                name: fileName,
                uri: result.assets[0].uri,
                type: 'image/' + fileType
            }

            setFile(image)
            setNomeImagem(fileName)

        } else {
            //ToastAndroid.show("Operação Cancelada", 1000)
            alert("operação cancelada")
        }
    };

    function selectCategory(tipo) {

        if (!botaoCategorias.isActive) return

        switch(tipo) {

            case "prato": 
                setTipo("Prato")
                break
            case "bebida": 
                setTipo("Bebida")
                break
            case "sobremesa": 
                setTipo("Sobremesa")
                break
            default:
                setTipo("Categoria")
        }


        setBotaoCategorias({
            graus: "180",
            translate: -9,
            radius: 10,
            isActive: 0
        })

    }


    return(
        <>
            <View style={styles.item}>
                <View style={styles.boxPhoto}>
                    <Pressable activeOpacity={1} style={styles.btnAddPhoto} accessibilityRole='button' accessibilityLabel="Adicionar foto" onPress={pickImage}>
                        {
                            !foto ? (
                            <>
                                <View style={{position: "absolute", top: 2, right: 2}}>
                                    <Icon 
                                        name="plus"
                                        size={25}
                                        color={"#445A14"}
                                        style={{alignItems: "flex-end"}}
                                    />
                                </View>
                                <View style={{width: "100%", height: "100%", alignItems: "center", justifyContent: "center"}}>
                                    <Icon 
                                        name="cutlery"
                                        size={30}
                                        color={"#445A14"}
                                    />
                                </View>
                            </>
                            ) : (
                                <Image source={{uri: foto}} style={{height: '100%', width: '100%', resizeMode: "cover"}} />
                            )
                        }
                        
                    </Pressable>
                </View>
                <View style={styles.boxDescItem}>

                    <View style={styles.titleProduct}>
                        <TextInput 
                            style={styles.inptTitle}
                            placeholder="Nome do Prato"
                            cursorColor={"black"}
                            value={nome}
                            onChangeText={setNome}
                        />
                    </View>

                    <View style={styles.descProduct}>
                        <TextInput  
                            style={styles.inptDesc}
                            multiline={true}
                            numberOfLines={5}
                            maxLength={186}
                            cursorColor={"#445A14"}
                            placeholder="Descrição"
                            accessibilityRole="text"
                            accessibilityLabel="Descrição do Prato:"
                            value={desc}
                            onChangeText={setDesc}
                        />

                    </View>

                    <View style={styles.priceProduct}>
                        <View style={{width: "35%", alignItems: "center", justifyContent: "center"}}><Text style={styles.textUnid}>1 unid.</Text></View>
                        <View style={{width: "65%", alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 5}}>
                            <Text style={styles.textR$}>R$</Text>
                            <TextInput 
                                style={styles.inptPrice}
                                placeholder="Valor"
                                keyboardType="numeric"
                                cursorColor={"#445A14"}
                                value={price}
                                onChangeText={setPrice}
                            />
                        </View>
                    </View>

                    {
                        (menu.length - 1) == index ? (
                        <Pressable style={styles.btnAddItem} accessibilityRole='button' accessibilityLabel="Adicionar item ao menu" onPress={menuTools.createItem}>
                            <Image source={require("../assets/icons/adicionar.png")} style={styles.imgAddItem}/>
                        </Pressable>
                    ) : (
                        <Pressable style={styles.btnRemoveItem} accessibilityRole='button' accessibilityLabel="Adicionar item ao menu" onPress={() => {menuTools.deleteItem(id); console.log(menu)}}>
                            <Image source={require("../assets/icons/BotaoRemover.png")} style={styles.imgRemoveItem}/>
                        </Pressable>
                    )
                    }

                </View>    
            </View>
            <View style={styles.boxCategoria}>
                <Pressable 
                    style={[styles.btnCategoria, {borderBottomLeftRadius: botaoCategorias.radius, borderBottomRightRadius: botaoCategorias.radius,}]}
                    onPress={showOrHideCategory}
                >
                    <Image source={require("../assets/icons/triangulo.png")} 
                        style={[styles.triangulo, {left: 10, transform: [{ rotate: `${botaoCategorias.graus}deg`}, {translateY: botaoCategorias.translate}]}]}
                    />

                    <Text style={[styles.textCategoria, {fontSize: tipo == "Sobremesa" ? 12 : 13}]}>
                        {botaoCategorias.isActive ? "" : tipo}
                    </Text>

                    <Image source={require("../assets/icons/triangulo.png")} 
                        style={[styles.triangulo, {right: 10, transform: [{ rotate: `${botaoCategorias.graus}deg`}, {translateY: botaoCategorias.translate}]}]}
                    />
                </Pressable>
                <View style={[styles.categorias, {opacity: botaoCategorias.isActive}]}>
                    <Pressable style={styles.typeCategory} onPress={() => selectCategory("prato")}>
                        <Text style={styles.textCategory}>Prato</Text>
                    </Pressable>
                    <Pressable style={[styles.typeCategory, {borderColor: "white"}]} onPress={() => selectCategory("bebida")}>
                        <Text style={styles.textCategory}>Bebida</Text>
                    </Pressable>
                    <Pressable style={styles.typeCategory} onPress={() => selectCategory("sobremesa")}>
                        <Text style={styles.textCategory}>Sobremesa</Text>
                    </Pressable>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    item: {
        width: "90%",
        height: 150,
        flexDirection: "row",
        alignItems: "center",
        zIndex: -1,
    },
    boxPhoto: {
        height: 150,
        width: 140,
        backgroundColor: "#B7A187",
        alignItems: "center",
        justifyContent: "center"
    },
    btnAddPhoto: {
        height: 130,
        width: 120,
        backgroundColor: "white",
        borderRadius: 2,
        position: "relative",
    },
    boxDescItem: {
        flex: 1,
        height: 150,
        backgroundColor: "#D1C0AB",
        position: "relative",
        
    },
    btnAddItem: {
        width: 30,
        height: 30,
        resizeMode: "contain",
        position: "absolute",
        bottom: -7,
        right: -10,
    },
    btnRemoveItem: {
        width: 31,
        height: 31,
        resizeMode: "contain",
        position: "absolute",
        bottom: -8,
        right: -11,
    },
    imgAddItem: {
        width: 30,
        height: 30,
    },
    imgRemoveItem: {
        width:30,
        height: 30,
        resizeMode: "cover"
    },
    titleProduct: {
        width: "100%",
        height: "25%",
        alignItems: "center",
        paddingTop: 4
    },
    descProduct: {
        width: "100%",
        height: "55%",
        alignItems: "center",
        paddingTop: 4
    },
    priceProduct: {
        width: "100%",
        height: "20%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    inptTitle: {
        width: "95%",
        height: 35,
        borderWidth: 2,
        borderColor: "#445A14",
        borderRadius: 8,
        backgroundColor: "white",
        paddingLeft: 8,
        fontFamily: "lemonada"
    },
    inptDesc: {
        width: "95%",
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: "#445A14",
        borderRadius: 15,
        paddingLeft: 10,
        fontFamily: "lemonada",
        padding: 5, 
        height: 80, 
        textAlignVertical: "top",
        fontSize: 12,
    },
    inptPrice: {
        width: 60,
        height: 24,
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: "#445A14",
        borderRadius: 5,
        textAlign: "center",
        fontFamily: "lemonada",
        fontSize: 11
    },
    textUnid: {
        fontSize: 15,
        fontFamily: "kavoon",
        textAlign: "center",
        color: "#445A14",
        paddingBottom: 2
    },
    textR$: {
        fontSize: 15,
        fontFamily: "kavoon",
        textAlign: "center",
        color: "#445A14",
        paddingBottom: 2
    },
    boxCategoria: {
        width: "90%",
        height: 20,
        marginTop: -20,
        overflow: "visible",
        
    },
    btnCategoria: {
        width: 140,
        height: 30,
        backgroundColor: "#445A14",
        position: "relative"
    },
    textCategoria: {
        width: "100%",
        height: "100%",
        textAlign: "center",
        fontFamily: "lemonada",
        color: "white",
        fontSize: 13,
    },
    triangulo: {
        position: "absolute",
        width: 13,
        height: 13,
        resizeMode: "contain",
    },
    categorias: {
        width: 140,
        height: 100,
        backgroundColor: "#445A14",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        position: "absolute",
        top: 20,
        zIndex: 10
    },
    typeCategory: {
        width: 140,
        height: 33.3,
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: "transparent"
    },
    textCategory: {
        fontFamily: "lemonada",
        color: "white",
        fontSize: 12
    }
})

export default memo(ItemMenu) 