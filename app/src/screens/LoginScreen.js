import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header.js'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { iceValidator } from '../helpers/iceValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { ScrollView } from 'react-native-gesture-handler'
import axios from 'axios'

export default function LoginScreen({ navigation }) {
  const [ice, setIce] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onLoginPressed = () => {
    const iceError = iceValidator(ice.value)
    const passwordError = passwordValidator(password.value)
    if (iceError || passwordError) {
      setIce({ ...ice, error: iceError })
      setPassword({ ...password, error: passwordError })
      return
    }

    const options = {
      method: 'POST',
      url: 'http://192.168.10.34:8080/api/mfn/v1/auth',
      headers: {
        'Access-Control-Allow-Origin':'*',
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data: {
        ice: ice.value,
        pwd: password.value,
      },
    }

    axios
      .request(options)
      .then(function (response) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        })
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1}}>
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="ICE"
        returnKeyType="next"
        value={ice.value}
        onChangeText={(text) => setIce({ value: text, error: '' })}
        error={!!ice.error}
        errorText={ice.error}
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },

})