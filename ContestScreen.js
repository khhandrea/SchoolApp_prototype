import React, { Component } from 'react'
import { Text, StyleSheet, View, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
import { LinearGradient } from 'expo';
import ArrowBack from './Icons/arrowBack.svg';

export default class ContestScreen extends Component {
    static navigationOptions = {
        header: null
    }
    render() {

        return (
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <StatusBar barStyle="light-content" backgroundColor={'#707070'} translucent={true} />
                <LinearGradient colors={['#C2C7FB', '#FCBEC0']} style={styles.Header} start={[1, 0]} end={[0, 1]} >
                    <Text style={{ fontSize: 30, fontFamily: 'nanumbarungothic', color: 'white', position: 'absolute', left: 26, top: 44 }}>수행/대회</Text>
                    <TouchableOpacity style={{
                        position: 'absolute',
                        right: 16,
                        top: 46,
                    }} onPress={() => this.props.navigation.goBack()}>
                        <ArrowBack />
                    </TouchableOpacity>

                </LinearGradient>
            </ScrollView >
        )
    }
}

const styles = StyleSheet.create({
    Header: {
        height: 520,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,

    }
})
