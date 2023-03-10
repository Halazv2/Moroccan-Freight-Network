import React, { useState } from 'react';
import { View, TextInput, StyleSheet , TouchableOpacity , Text, Image } from 'react-native';

const SearchBar = ({ searchTerm, setSearchTerm, handleSearchSubmit }) => {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor={'#a9a9a9'}
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
        <TouchableOpacity
          style={styles.button} 
          onPress={handleSearchSubmit}
        >
          <Image
            style={styles.buttonIcon}
            source={require('../assets/search.png')}
          />
        </TouchableOpacity>
      </View>
    );
};  

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10,
        left: 10,
        right: 10,
        zIndex: 1,
    },
    input: {
        height: 50,
        fontSize: 18,
        borderRadius: 15,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 5,
        color: '#333',
    },
    button: {
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
        right: 10,
        top: -3,
    },
    buttonIcon: {
        width: 18,
        height: 18,
    },

});

export default SearchBar;
