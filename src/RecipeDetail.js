import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator, Button, Alert } from 'react-native';
import axios from 'axios';

const API_KEY = 'API_KEY'; // Your API Key
const SERVER_URL = 'URL'; // Your server IP address

const RecipeDetail = ({ route }) => {
  const { recipe } = route.params; // Get the recipe data from navigation
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch recipe details from the API
  const fetchRecipeDetails = async () => {
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${API_KEY}`);
      setDetails(response.data);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      Alert.alert('Error', 'Failed to fetch recipe details.');
    } finally {
      setLoading(false);
    }
  };

  // Save recipe to favorites
  const saveFavorite = async () => {
    if (!details) {
      Alert.alert('Error', 'No recipe details available to save.');
      return;
    }
  
    try {
      const userId = 1; // Replace with actual user ID logic if needed
      console.log("Saving favorite with recipe ID:", details.id);
      const response = await axios.post(`${SERVER_URL}/favorites`, {
        recipe_id: details.id,
        recipe_name: details.title, // Save the recipe name
        user_id: userId,
      });
      if (response.status === 201) {
        Alert.alert('Success', 'Recipe saved to favorites!');
      }
    } catch (error) {
      console.error('Error saving favorite recipe:', error);
      Alert.alert('Error', error.response?.data?.error || 'Failed to save favorite.');
    }
  };

  useEffect(() => {
    fetchRecipeDetails();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#841584" style={styles.loadingIndicator} />;
  }

  if (!details) {
    return <Text style={styles.errorText}>No details available.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: details.image }} style={styles.image} />
      <Text style={styles.title}>{details.title}</Text>
      <Text style={styles.summary}>{details.summary.replace(/<[^>]+>/g, '')}</Text>
      
      <Button title="Save to Favorites" onPress={saveFavorite} color="#841584" />

      <Text style={styles.ingredientsTitle}>Ingredients:</Text>
      <View style={styles.ingredientsContainer}>
        {details.extendedIngredients.map((ingredient) => (
          <Text key={ingredient.id} style={styles.ingredient}>
            • {ingredient.original}
          </Text>
        ))}
      </View>

      <Text style={styles.instructionsTitle}>Instructions:</Text>
      <Text style={styles.instructions}>
        {details.instructions ? details.instructions.replace(/<[^>]+>/g, '') : 'No instructions available.'}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  summary: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    lineHeight: 24,
  },
  ingredientsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  ingredientsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  ingredient: {
    fontSize: 16,
    color: '#444',
    marginBottom: 5,
  },
  instructionsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    marginBottom: 20,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default RecipeDetail;
