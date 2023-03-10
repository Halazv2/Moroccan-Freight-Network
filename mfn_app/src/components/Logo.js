import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return <Image source={require('../assets/logoApp.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 154,
    height: 83,
    marginBottom: 8,
  },
})