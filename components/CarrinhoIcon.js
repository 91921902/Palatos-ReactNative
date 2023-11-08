import { View, Image, StyleSheet, Pressable } from "react-native";

export default function BotaoCarrinho({onPress}) {

    return(
        <Pressable style={styles.botaoCarrinho} onPress={onPress}>
            <Image source={require("../assets/carrinho.png")} style={{resizeMode: "contain", width: 50, height: 50}}/>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    botaoCarrinho: {
        width: 50,
        height: 50,
        position: "absolute",
        top: 40,
        right: 30,
        borderRadius: 5000,
    }
})