import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, Modal, TextInput, TouchableOpacity} from "react-native";
import Saldos from "../screens/Saldos";

import api from "../utils/Api";

const Adicionar = (props) => {
    const [modalVisible, setModalVisible] = useState(false);

    const [text, onChangeText] = useState("");

    const Cadastrar = () => {
        var URL = "";
        var data = [];

        if(props.tipo == "Cliente"){
            data = {
                nome: text
            }
            URL = "usuarios";
        }

        if(props.tipo == "Saldo"){
            data ={
                valor: parseFloat(text),
                usuarioId: props.idUsuario
            }
            URL = "usuarios/" + props.idUsuario + "/saldos";
        }
        
        

        api.post(URL, data)
        .then(() => {
            setModalVisible(false);
            props.navigation.push(props.tipo + "s", {id: props.idUsuario, nome: props.nome});
        });
    }

    /**
     * Rendering
     * 
     */

    return(
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() =>{setModalVisible(!modalVisible)}}
            >
                <View  style={styles.centeredView}>

                    <View style={styles.modalView}>

                        <View style={styles.modalHeader}>

                            <Text style={styles.modalTitulo}>
                                Novo {props.tipo}
                            </Text>
                            <TouchableOpacity style={styles.btn} 
                                onPress = {() => {setModalVisible(false)}}
                            >
                                <Text style={styles.txt}>
                                    X
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <TextInput placeholder={props.tipo} style={styles.input} onChangeText={onChangeText} value={text} />

                        <TouchableOpacity style={styles.btnCadastro} 
                            onPress = {() => {Cadastrar()}}
                        >
                            <Text style={styles.txt}>
                                Cadastrar
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </Modal>

            <TouchableOpacity style={styles.btn}
                onPress = {() => {setModalVisible(true)}}
            >
                <Text style={styles.txt}> + </Text>
            </TouchableOpacity>

        </View>
    );
}

export default Adicionar;

const styles = StyleSheet.create({
    btn: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3F3D46",
        width: "50px",
        height: "50px",
        borderRadius: "12px",
        marginRight: "20px",
    },
    txt: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: "36px",
        marginTop: "-10px"
    },


    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView:{
        width: "100%",
        minHeight: "50%",
        margin: 20,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",

        shadowColor: "#000000",
        shadowOffset:{
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitulo: {
        fontSize: "30px",
        fontWeight: "bold",
        color: "#3F3D46"
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "90%"
    },

    input: {
        width: "100%",
        height: 40,
        margin: 20,
        padding: 10,
        borderWidth: 1,
        borderRadius: "12px"
    },
    btnCadastro: {
        flex: 1,
        backgroundColor: "#3F3D46",
        paddingHorizontal: 60,
        paddingVertical: 30,
        borderRadius: 10,
        margin: 10,
    }
});