import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const API_KEY = '63c682ff12ab41a287c32e09c186decf'; // Your API Key
const API_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`;
const SERVER_URL = 'http://192.168.0.109:3000'; // Your server IP address

const SearchPage = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // Function to fetch recipes based on the search term
  const fetchRecipes = async (term) => {
    try {
      const response = await axios.get(`${API_URL}&query=${term}`);
      setFilteredRecipes(response.data.results);
    } catch (error) {
      console.error('Error searching recipes:', error);
    }
  };

  // Function to save the search keyword to the database
  const saveSearchTerm = async () => {
    if (!searchTerm) {
      Alert.alert('Error', 'Please enter a search term.');
      return;
    }

    try {
      await axios.post(`${SERVER_URL}/search`, { keyword: searchTerm });
      Alert.alert('Success', 'Search keyword saved successfully!');
      fetchRecipes(searchTerm); // Fetch recipes after saving the keyword
    } catch (error) {
      console.error('Error saving search keyword:', error);
      Alert.alert('Error', 'Failed to save search keyword.');
    }
  };

  // Handle pressing on a recipe to navigate to its detail page
  const handleRecipePress = (recipe) => {
    navigation.navigate('RecipeDetail', { recipe }); // Navigate to RecipeDetail
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recipe Search</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Enter a keyword..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <Button title="Search" onPress={saveSearchTerm} color="#841584" />

      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.recipeItem} onPress={() => handleRecipePress(item)}>
            <Image source={{ uri: item.image }} style={styles.recipeImage} />
            <Text style={styles.recipeTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.noRecipes}>No recipes found. Try searching for something else!</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchInput: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    width: '100%',
  },
  recipeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    marginVertical: 5,
    padding: 10,
  },
  recipeImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 15,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  noRecipes: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default SearchPage;
