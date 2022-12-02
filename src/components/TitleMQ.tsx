import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TitleMQ = () => {
  return (
    <View>
        <Text style={styles.title}>
        <Text style={{ color: '#E6E5A3'}}>M</Text>
        EMO
        <Text style={{ color: '#E6E5A3'}}>Q</Text> 
        UE
        <Text style={{ color: '#E6E5A3'}}>?</Text>
      </Text>
    </View>
  )
}

export default TitleMQ

const styles = StyleSheet.create({
    title:{
      fontSize: 32,
      color: 'white',
      marginBottom: 20,
      fontFamily: 'J-bold'
    },
})