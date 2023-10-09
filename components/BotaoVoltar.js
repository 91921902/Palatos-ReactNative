import { View, Image, StyleSheet, Pressable } from "react-native";

export default function BotaoVoltar({onPress}) {

    return(
        <Pressable style={styles.botaoVoltar} onPress={onPress}>
            <Image source={require("../assets/icons/voltar.png")} style={{resizeMode: "contain", width: 50, height: 50}}/>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    botaoVoltar: {
        width: 50,
        height: 50,
        position: "absolute",
        top: 40,
        left: 30,
        borderRadius: 5000,
    }
})