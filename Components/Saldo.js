import React from "react";
import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from "react-native";

import api from "../utils/Api";

const Saldo = (props) => {

    const Deletar = (id) =>{
        
         api.delete("usuarios/"+props.idCliente+"/saldos/"+id)
         .then(() => props.navigation.push("Saldos", { id: props.idCliente, nome: props.nome})
         );
        
    }
    
    return(
        <View style={styles.card}>

            <Text style={styles.valor}>
                {props.valor.toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}
            </Text>

            <TouchableOpacity onPress={() => Deletar(props.id)}>
                <Image 
                    style={styles.lixeira}
                    source={require("../assets/Imagens/lixeira.png")}
                />
            </TouchableOpacity>
        </View>
    );
}

export default Saldo;

const styles = StyleSheet.create({
    card:{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: "12px",
        marginVertical: "10px",
        paddingVertical: "20px",

        //Shadow Properties
        shadowColor: "green",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    lixeira:{
        width: 20,
        height: 20,
    },
    valor: {
        color: "#5A5765",
        fontSize: "20px",
        fontWeight: "bold",
    }
})