import React from 'react';
import { Text, View } from 'react-native';
import { Header } from './src/components/header'
import { Container } from './src/components/container'


export default function App() {
  return (
    <View style={{flex: 1}}>
      <Header/>
      <Container/>
    </View>
  );
}
