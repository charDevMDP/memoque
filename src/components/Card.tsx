import { View, Text, Pressable, StyleSheet, Animated } from 'react-native'
import React, { createRef, useEffect, useRef, useState } from 'react'

const Card = ({ onPress, isTurnedOver, children }:any) => {

  return (
    <Pressable onPress={onPress} style={isTurnedOver ? styles.cardUp : styles.cardDown}>
      {isTurnedOver ? (
          <Text style={styles.text}>{children}</Text>
      ):(
          <Text style={styles.textLogo}>MQ?</Text>
      )}
    </Pressable>
  )

}

export default Card;

const styles = StyleSheet.create({
  cardUp:{
    width: 70,
    height: 70,
    margin: 10,
    borderRadius: 20,
    borderWidth: 5,
    borderColor: '#A9AF7E',
    backgroundColor: '#7D8F69',
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
  },
  cardDown:{
    width: 70,
    height: 70,
    margin: 10,
    borderWidth: 5,
    borderColor: '#fff',
    backgroundColor: '#7D8F69',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backfaceVisibility: 'hidden'
  },
  text:{
    fontSize: 35,
    color: '#fff',
    fontFamily: 'J-bold'
  },
  textLogo:{
    fontSize: 20,
    color: '#fff',
    fontFamily: 'J-bold'
  }
})