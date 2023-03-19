import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header.js'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>Moroccan Freight Network</Header>
      <Paragraph>
        Connects with a wide range of tools designed for successful networking.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Dashboard')}
      >
        Login As Guest
      </Button>
    </Background>
  )
}