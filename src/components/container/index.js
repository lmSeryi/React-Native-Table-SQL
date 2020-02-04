import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from './style'
import { Icon, Avatar } from 'react-native-elements'

import { Header } from '../header'

export const Container = () =>{

    const [tasks, setTasks] = useState([])

    const datos = async ()=>{
        const apiCall = await fetch('http://192.168.0.4:3000/Hi')
        const setTask = await apiCall.json()
        setTasks(setTask)
        
    }

    useEffect(()=>{
        datos()
    },[tasks.title])

    return (
    <View style={{
            backgroundColor: '#232323', 
            flexWrap: 'wrap', 
            flexDirection:'row'
            }}
    >
    </View>
    );
}