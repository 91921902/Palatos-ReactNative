import { View, Image, StyleSheet, Pressable } from "react-native";
import A11y from "../providers/A11y";

export default function BotaoCarrinho({onPress}) {

    return(
        <Pressable
        style={styles.botaoCarrinho}
        {...A11y.role("button")}
        {...A11y.label("Voltar")}
        onPress={onPress}>
            <Image source={require("../assets/icons/voltar.png")} style={{resizeMode: "contain", width: 50, height: 50}}/>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    botaoCarrinho: {
        width: 50,
        height: 50,
        position: "absolute",
        top: 40,
        left: 30,
        borderRadius: 5000,
    }
})