import React, { useEffect, useState } from 'react';
import {View, Text, Button, StyleSheet} from 'react-native'
import Titulo from '../components/Titulo';
import Saldo from '../components/Saldo';
import Adicionar from '../components/Adicionar';
import api from '../utils/Api';


const Saldos = ({route, navigation}) => {
    
    const [saldos, setSaldos] = useState([]);

    const ListarSaldos = async () => {
        try{
            const resultado = await api.get("usuarios/"+route.params.id+"/saldos");
            if(resultado !== null){
                setSaldos(resultado.data);
            }
        }
        catch(error){
            console.log(error);
        }
    }

    const SomarSaldos = (...saldos) => {
        const somados = [];

        saldos[0].map((value) => {
            somados.push(value.valor);
        });

        try {
            if(somados !== null){
                return somados.reduce((acumulador, value) => acumulador + value);
            }else{
                console.log(`SALDOS.JS: ${typeof somados} somados: ${somados}`);
                return 0;
            }
        } catch (error) {
            console.log(error);
            return 0;
        }
    }

    useEffect(() => {
        ListarSaldos();
    }, [])

    return(
        <View style={styles.container}>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <Titulo titulo="Saldos" />
                <Adicionar tipo="Saldo" navigation={navigation} idUsuario={route.params.id} />
            </View>

            <View style={styles.contentContainer}>
                <Titulo titulo="Saldos" />
            </View>
                
                <Text style={styles.nomeCliente}>
                    {route.params.nome}
                </Text>

                <Text style={styles.total}>
                    TOTAL : R$ {SomarSaldos(saldos)}
                </Text>
                
                <View style={styles.lista}>
                    {saldos.map((item) =>
                        <Saldo 
                            key={item.id}
                            id={item.id}
                            idCliente={route.params.id}
                            nome={route.params.nome}
                            valor={item.valor}
                            navigation={navigation}
                        />
                    )}
                </View>

                <Button 
                    title="Ir para Clientes"
                    onPress={() => { navigation.navigate("Clientes")}}
                />
        </View>
    );    
}

export default Saldos;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#6840F5",
        padding: "0px 30px",
    },
    contentContainer:{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
    },
    lista: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        padding: "30px",
        borderTopLeftRadius: "30px",
        borderTopRightRadius: "30px",
    },
    nomeCliente: {
        color: "#FFFFFF",
        marginHorizontal: "40px"
    },
    total: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: "28px",
        marginVertical: "40px",
        marginHorizontal: "40px"
    }
})