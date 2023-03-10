import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import LocationPicker from '../components/LocationPicker.js'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header.js'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { iceValidator } from '../helpers/iceValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { steValidator } from '../helpers/steValidator.js'
import { numValidator } from '../helpers/numValidator.js'
import { managerValidator } from '../helpers/managerValidator.js'
import { ScrollView } from 'react-native-gesture-handler'
import MapboxGL from '@rnmapbox/maps';
import axios from 'axios'

MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken('pk.eyJ1IjoiYi1heW91YiIsImEiOiJjbGV5ZWI2d3UyazVqM3JwMXR0OWxkd3prIn0.pdTtvE7pnovzW8nsZpZhoA');



export default function RegisterScreen({ navigation }) {
  const [ice, setIce] = useState({ value: '', error: '' })
  const [ste, setSte] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [num, setNum] = useState({ value: '', error: '' })
  const [manager, setManager] = useState({ value: '', error: '' })
  const [location, setLocation] = useState({ value: [], error: '' })
  const [opened , chooseLocation] = useState(false)

  const onSignUpPressed = () => {
    const steError = steValidator(ste.value)
    const passwordError = passwordValidator(password.value)
    const numError = numValidator(num.value)
    const iceError = iceValidator(ice.value)
    const managerError = managerValidator(manager.value)


    if (passwordError || numError || steError || iceError || managerError) {
      setSte({ ...ste, error: steError })
      setPassword({ ...password, error: passwordError })
      setNum({ ...num, error: numError })
      setIce({ ...ice, error: iceError })
      setManager({ ...manager, error: managerError })
      return
    }
    const options = {
      method: 'POST',
      url: 'http://192.168.10.34:8080/api/mfn/v1/register',
      headers: {
        'Access-Control-Allow-Origin':'*',
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data: {
        ste: ste.value,
        pwd: password.value,
        num: num.value,
        ice: ice.value,
        manager: manager.value,
        coord: location.value
      },
    }

    console.log("options", options)
  
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
      }
      )

  }

  const data = [
    { value: 'Current Location' },
    { value: 'Other Location' },
  ];
  
  const checkLocation = (value) => {
    console.log(value)
    if(value === 'current'){
      console.log('hello')
      setLocation({ value: [0,0], error: '' })
    }else{
      chooseLocation(true)
    }
  }


  return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} scrollEnabled={!opened}>
        <Background>
          <BackButton goBack={navigation.goBack} />
          <Logo />
          <Header>Create Account</Header>
          <TextInput
            label="Ste Name"
            returnKeyType="next"
            value={ste.value}
            onChangeText={(text) => setSte({ value: text, error: '' })}
            error={!!ste.error}
            errorText={ste.error}
          />
          <TextInput
            label="Phone Number"
            returnKeyType="next"
            value={num.value}
            onChangeText={(text) => setNum({ value: text, error: '' })}
            error={!!num.error}
            errorText={num.error}
          />
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
            label="Manager"
            returnKeyType="next"
            value={manager.value}
            onChangeText={(text) => setManager({ value: text, error: '' })}
            error={!!manager.error}
            errorText={manager.error}
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
          <LocationPicker 
            label="Location"
            returnKeyType="done"
            value={checkLocation}
            choices={data}
          />
          <Button
            mode="contained"
            onPress={onSignUpPressed}
            style={{ marginTop: 24 }}
          >
            Sign Up
          </Button>
          <View style={styles.row}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
          </View>
          { (opened)?
            (
            <View style={styles.mapsBackground}>
              <Text style={styles.headerMap}>Choose Location By click on it</Text>
                <View style={styles.mapsContainer}>
                    <MapboxGL.MapView
                        styleURL={MapboxGL.StyleURL.Satellite}
                        zoomLevel={15}
                        centerCoordinate={[-9.234810,32.293174]}
                        style={styles.maps}
                        onPress={(e) => {
                            console.log(e)
                            setLocation({value: e.geometry.coordinates, error: ''})
                            chooseLocation(false)
                        }}
                    >
                    </MapboxGL.MapView>
                </View>
            </View>
            )
            : null
          }
        </Background> 
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
    paddingBottom: 20,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  mapsContainer: {
      flex: 1,
      width: 350,
      height: 350,
      justifyContent: 'flex-end',
      alignItems: 'center',
      position: 'absolute',
      top: '30%',
  },
  mapsBackground: {
      flex: 1,
      width: 500,
      height: '100%',
      justifyContent: 'flex-end',
      alignItems: 'center',
      position: 'absolute',
      top: '0%',
      backgroundColor: 'rgba(0,0,0,0.5)',
  },
  maps: {
      flex: 1,
      width: '100%',
      height: '100%',
  },
  headerMap: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      position: 'absolute',
      top: '20%',
  }
})