import React , { useState , useEffect , useRef } from 'react'
import MapboxGL from '@rnmapbox/maps';
import { View, StyleSheet ,Animated } from 'react-native';
import axios from 'axios';
import { Text } from 'react-native-paper';
import SearchBar from '../components/SearchBar';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { theme } from '../core/theme'


const API_KEY = 'pk.eyJ1IjoiYi1heW91YiIsImEiOiJjbGV5ZWI2d3UyazVqM3JwMXR0OWxkd3prIn0.pdTtvE7pnovzW8nsZpZhoA'
MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken(API_KEY);


export default function Dashboard({ navigation }) {

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [coordinate, setCoordinate] = useState([-7.58984375, 33.57311032714844]);
  const [zoomLevel, setZoomLevel] = useState(5);
  const [listOpen , setListOpen] = useState(true);

  const handleSearchSubmit = async () => {
    const query = encodeURI(searchTerm);
    console.log(query);
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${API_KEY}`);
    const data = await response.json();
    if (data.features.length > 0) {
      setCoordinate(data.features[0].center);
      setZoomLevel(12);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'http://192.168.10.34:8080/api/mfn/v1/companies',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer pk.eyJ1IjoiYi1heW91YiIsImEiOiJjbGV5ZWI2d3UyazVqM3JwMXR0OWxkd3prIn0.pdTtvE7pnovzW8nsZpZhoA'
        }
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          setData(response.data);
        })
        .catch(function (error) {
          console.error(error);
        })

      
    };

    fetchData();
  }, []);
  

  return (
    <View style={styles.container}>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearchSubmit={handleSearchSubmit} />
      <MapboxGL.MapView
        style={{ flex: 1 }}
        styleURL={MapboxGL.StyleURL.Street}
        centerCoordinate={coordinate}
      >
        <MapboxGL.Camera
          zoomLevel={zoomLevel}
          centerCoordinate={coordinate}
        />

        {data.map((company, index) => (
          <MapboxGL.PointAnnotation
            key={index}
            id={company._id}
            coordinate={[company.coord[0], company.coord[1]]}
          >
            <MapboxGL.Callout>
              <View style={styles.colloutView}>
              <Text
                style={{color: '#fff'}}
              >Name : {company.ste}</Text>
              <Text 
                style={{color: '#fff'}}
              >Manager : {company.manager}</Text>
              <Text
                style={{color: '#fff'}}
              >Phone : {company.num}</Text>
              <Text
                style={{color: '#fff'}}
              >Address : {company.address}</Text>
              </View>
            </MapboxGL.Callout>

          </MapboxGL.PointAnnotation>
        ))}

      </MapboxGL.MapView>
      <View style={styles.logout}>
        <TouchableOpacity
          onPress={() => navigation.replace('StartScreen')}
        >
          <Text style={styles.link}>Logout</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.list}>
        <TouchableOpacity
          onPress={() => {
            setListOpen(!listOpen);
          }}
        >
          <Text style={styles.link}>List Of Companies</Text>
        </TouchableOpacity>
      </View>   
      <View style={
        [styles.companiesList,
        {
          left: listOpen ? -350 : 0,
        }
        ]
        }>
          <Text
            style={styles.title}
          >Companies List :</Text>
          <ScrollView
            style={styles.scroll}
          >
          {data.map((company, index) => (
            <View style={styles.cart}>
              <Text>Name : {company.ste}</Text>
              <Text>Manager : {company.manager}</Text>
              <Text>Phone : {company.num}</Text>
              <Text>Address : {company.address}</Text>
            </View>
          ))}
          </ScrollView>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#F5FCFF',
  },
  colloutView: {
    backgroundColor: '#fa4e58',
    maxWidth: 250,
    justifyContent: 'center',
    gap : 10,
    padding: 10,
    borderRadius: 5,
    borderColor: '#9a2b25',
    borderWidth: 1,
  },
  logout: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginLeft: 10,
    elevation: 5,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  list: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginLeft: 10,
    elevation: 5,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    position: 'absolute',
    top: 60,
    right: 10,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  companiesList: {
    backgroundColor: '#fff',
    padding: 10,
    paddingRight: 20,
    marginLeft: 0,
    width: 350,
    height: 611,
    borderBottomRightRadius : 10,
    borderTopRightRadius : 10,
    elevation: 5,
    position: 'absolute',
    top: 120,
    gap : 10,
  },
  cart: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginLeft: 10,
    elevation: 5,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  scroll: {
    flex: 1,
    width: "100%",
    height: "100%",
    paddingBottom: 10,
  }

});