
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
// import axios from 'axios';

// const RecipeDetail = ({ route }) => {
//   const { recipeId } = route.params;
//   const [recipe, setRecipe] = useState(null);

//   const fetchRecipeDetail = async () => {
//     try {
//       const response = await axios.get(`http://192.168.0.109:3000/recipes/${recipeId}`);
//       setRecipe(response.data);
//     } catch (error) {
//       console.error('Error fetching recipe details:', error);
//     }
//   };

//   useEffect(() => {
//     fetchRecipeDetail();
//   }, []);

//   if (!recipe) return null; // or a loading indicator

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>{recipe.title}</Text>
//       <Text style={styles.description}>{recipe.description}</Text>
//       <Button title="Add to Favorites" onPress={() => {/* Call function to add to favorites */}} />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   description: {
//     marginTop: 10,
//     fontSize: 16,
//   },
// });

// export default RecipeDetail;

// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
// import axios from 'axios';

// const API_KEY = '63c682ff12ab41a287c32e09c186decf'; // Your API Key

// const RecipeDetail = ({ route }) => {
//   const { recipe } = route.params; // Get the recipe passed from the search page
//   const [details, setDetails] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchRecipeDetails = async () => {
//     try {
//       const response = await axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${API_KEY}`);
//       setDetails(response.data);
//     } catch (error) {
//       console.error('Error fetching recipe details:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRecipeDetails();
//   }, []);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#841584" style={styles.loadingIndicator} />;
//   }

//   if (!details) {
//     return <Text>No details available.</Text>;
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <Image source={{ uri: details.image }} style={styles.image} />
//       <Text style={styles.title}>{details.title}</Text>
//       <Text style={styles.description}>{details.summary.replace(/<[^>]+>/g, '')}</Text> {/* Strip HTML tags */}
//       <Text style={styles.ingredientsHeader}>Ingredients:</Text>
//       {details.extendedIngredients.map((ingredient) => (
//         <Text key={ingredient.id} style={styles.ingredient}>
//           - {ingredient.original}
//         </Text>
//       ))}
//       <Text style={styles.instructionsHeader}>Instructions:</Text>
//       {details.instructions ? (
//         <Text style={styles.instructions}>{details.instructions.replace(/<[^>]+>/g, '')}</Text>
//       ) : (
//         <Text>No instructions available.</Text>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     borderRadius: 10,
//     marginBottom: 15,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   description: {
//     fontSize: 16,
//     marginBottom: 10,
//     color: '#666',
//   },
//   ingredientsHeader: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 20,
//   },
//   ingredient: {
//     fontSize: 16,
//     marginVertical: 2,
//   },
//   instructionsHeader: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 20,
//   },
//   instructions: {
//     fontSize: 16,
//     marginVertical: 2,
//   },
//   loadingIndicator: {
//     marginTop: 20,
//   },
// });

// export default RecipeDetail;

// import React, { useEffect, useState } from 'react';
// import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator, Button, Alert } from 'react-native';
// import axios from 'axios';

// const API_KEY = '63c682ff12ab41a287c32e09c186decf'; // Your API Key
// const SERVER_URL = 'http://192.168.0.109:3000'; // Your server IP address

// const RecipeDetail = ({ route }) => {
//   const { recipe } = route.params;
//   const [details, setDetails] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchRecipeDetails = async () => {
//     try {
//       const response = await axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${API_KEY}`);
//       setDetails(response.data);
//     } catch (error) {
//       console.error('Error fetching recipe details:', error);
//       Alert.alert('Error', 'Failed to fetch recipe details.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const saveFavorite = async () => {
//     try {
//       const userId = 1; // Replace with actual user ID logic if needed
//       const response = await axios.post(`${SERVER_URL}/favorites`, {
//         recipe_id: details.id,
//         user_id: userId,
//       });
//       if (response.status === 201) {
//         Alert.alert('Success', 'Recipe saved to favorites!');
//       }
//     } catch (error) {
//       console.error('Error saving favorite recipe:', error);
//       Alert.alert('Error', 'Failed to save favorite.');
//     }
//   };

//   useEffect(() => {
//     fetchRecipeDetails();
//   }, []);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#841584" style={styles.loadingIndicator} />;
//   }

//   if (!details) {
//     return <Text style={styles.errorText}>No details available.</Text>;
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <Image source={{ uri: details.image }} style={styles.image} />
//       <Text style={styles.title}>{details.title}</Text>
//       <Text style={styles.summary}>{details.summary.replace(/<[^>]+>/g, '')}</Text>

//       <Button title="Save to Favorites" onPress={saveFavorite} color="#841584" />

//       <Text style={styles.ingredientsTitle}>Ingredients:</Text>
//       <View style={styles.ingredientsContainer}>
//         {details.extendedIngredients.map((ingredient) => (
//           <View key={ingredient.id} style={styles.ingredientItem}>
//             <Text style={styles.ingredientBullet}>•</Text>
//             <Text style={styles.ingredientText}>{ingredient.original}</Text>
//           </View>
//         ))}
//       </View>

//       <Text style={styles.instructionsTitle}>Instructions:</Text>
//       <Text style={styles.instructions}>
//         {details.instructions ? details.instructions.replace(/<[^>]+>/g, '') : 'No instructions available.'}
//       </Text>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   image: {
//     width: '100%',
//     height: 250,
//     borderRadius: 15,
//     marginBottom: 15,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   summary: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 15,
//     lineHeight: 24,
//     fontStyle: 'italic',
//   },
//   ingredientsTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginTop: 15,
//     marginBottom: 10,
//   },
//   ingredientsContainer: {
//     paddingLeft: 10,
//   },
//   ingredientItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 4,
//   },
//   ingredientBullet: {
//     fontSize: 20,
//     color: '#841584',
//     marginRight: 5,
//   },
//   ingredientText: {
//     fontSize: 16,
//     color: '#444',
//   },
//   instructionsTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginTop: 15,
//     marginBottom: 10,
//   },
//   instructions: {
//     fontSize: 16,
//     color: '#444',
//     lineHeight: 24,
//   },
//   loadingIndicator: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//   },
//   errorText: {
//     fontSize: 16,
//     color: 'red',
//     textAlign: 'center',
//     marginTop: 20,
//   },
// });

// export default RecipeDetail;


// import React, { useEffect, useState } from 'react';
// import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator, Button, Alert } from 'react-native';
// import axios from 'axios';

// const API_KEY = '63c682ff12ab41a287c32e09c186decf'; // Your API Key
// const SERVER_URL = 'http://192.168.0.109:3000'; // Your server IP address

// const RecipeDetail = ({ route }) => {
//   const { recipe } = route.params; // Get the recipe data from navigation
//   const [details, setDetails] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch recipe details from the API
//   const fetchRecipeDetails = async () => {
//     try {
//       const response = await axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${API_KEY}`);
//       setDetails(response.data);
//     } catch (error) {
//       console.error('Error fetching recipe details:', error);
//       Alert.alert('Error', 'Failed to fetch recipe details.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Save recipe to favorites
//   const saveFavorite = async () => {
//     try {
//       const userId = 1; // Replace with actual user ID logic if needed
//       const response = await axios.post(`${SERVER_URL}/favorites`, {
//         recipe_id: details.id,
//         user_id: userId,
//       });
//       if (response.status === 201) {
//         Alert.alert('Success', 'Recipe saved to favorites!');
//       }
//     } catch (error) {
//       console.error('Error saving favorite recipe:', error);
//       Alert.alert('Error', 'Failed to save favorite.');
//     }
//   };

//   useEffect(() => {
//     fetchRecipeDetails();
//   }, []);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#841584" style={styles.loadingIndicator} />;
//   }

//   if (!details) {
//     return <Text style={styles.errorText}>No details available.</Text>;
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <Image source={{ uri: details.image }} style={styles.image} />
//       <Text style={styles.title}>{details.title}</Text>
//       <Text style={styles.summary}>{details.summary.replace(/<[^>]+>/g, '')}</Text>
      
//       <Button title="Save to Favorites" onPress={saveFavorite} color="#841584" />

//       <Text style={styles.ingredientsTitle}>Ingredients:</Text>
//       <View style={styles.ingredientsContainer}>
//         {details.extendedIngredients.map((ingredient) => (
//           <Text key={ingredient.id} style={styles.ingredient}>
//             • {ingredient.original}
//           </Text>
//         ))}
//       </View>

//       <Text style={styles.instructionsTitle}>Instructions:</Text>
//       <Text style={styles.instructions}>
//         {details.instructions ? details.instructions.replace(/<[^>]+>/g, '') : 'No instructions available.'}
//       </Text>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   image: {
//     width: '100%',
//     height: 250,
//     borderRadius: 10,
//     marginBottom: 15,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   summary: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 15,
//     lineHeight: 24,
//   },
//   ingredientsTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginTop: 15,
//     marginBottom: 10,
//   },
//   ingredientsContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     elevation: 2,
//   },
//   ingredient: {
//     fontSize: 16,
//     color: '#444',
//     marginBottom: 5,
//   },
//   instructionsTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginTop: 15,
//     marginBottom: 10,
//   },
//   instructions: {
//     fontSize: 16,
//     color: '#444',
//     lineHeight: 24,
//     marginBottom: 20,
//   },
//   loadingIndicator: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//   },
//   errorText: {
//     fontSize: 16,
//     color: 'red',
//     textAlign: 'center',
//     marginTop: 20,
//   },
// });

// export default RecipeDetail;



// import React, { useEffect, useState } from 'react';
// import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator, Button, Alert } from 'react-native';
// import axios from 'axios';

// const API_KEY = '63c682ff12ab41a287c32e09c186decf'; // Your API Key
// const SERVER_URL = 'http://192.168.0.109:3000'; // Your server IP address

// const RecipeDetail = ({ route }) => {
//   const { recipe } = route.params; // Get the recipe data from navigation
//   const [details, setDetails] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch recipe details from the API
//   const fetchRecipeDetails = async () => {
//     try {
//       const response = await axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${API_KEY}`);
//       setDetails(response.data);
//     } catch (error) {
//       console.error('Error fetching recipe details:', error);
//       Alert.alert('Error', 'Failed to fetch recipe details.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Save recipe to favorites
//   const saveFavorite = async () => {
//     if (!details) {
//       Alert.alert('Error', 'No recipe details available to save.');
//       return;
//     }

//     try {
//       const userId = 1; // Replace with actual user ID logic if needed
//       const response = await axios.post(`${SERVER_URL}/favorites`, {
//         recipe_id: details.id,
//         user_id: userId,
//       });
//       if (response.status === 201) {
//         Alert.alert('Success', 'Recipe saved to favorites!');
//       }
//     } catch (error) {
//       console.error('Error saving favorite recipe:', error);
//       Alert.alert('Error', 'Failed to save favorite.');
//     }
//   };

//   useEffect(() => {
//     fetchRecipeDetails();
//   }, []);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#841584" style={styles.loadingIndicator} />;
//   }

//   if (!details) {
//     return <Text style={styles.errorText}>No details available.</Text>;
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <Image source={{ uri: details.image }} style={styles.image} />
//       <Text style={styles.title}>{details.title}</Text>
//       <Text style={styles.summary}>{details.summary.replace(/<[^>]+>/g, '')}</Text>
      
//       <Button title="Save to Favorites" onPress={saveFavorite} color="#841584" />

//       <Text style={styles.ingredientsTitle}>Ingredients:</Text>
//       <View style={styles.ingredientsContainer}>
//         {details.extendedIngredients.map((ingredient) => (
//           <Text key={ingredient.id} style={styles.ingredient}>
//             • {ingredient.original}
//           </Text>
//         ))}
//       </View>

//       <Text style={styles.instructionsTitle}>Instructions:</Text>
//       <Text style={styles.instructions}>
//         {details.instructions ? details.instructions.replace(/<[^>]+>/g, '') : 'No instructions available.'}
//       </Text>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   image: {
//     width: '100%',
//     height: 250,
//     borderRadius: 10,
//     marginBottom: 15,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   summary: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 15,
//     lineHeight: 24,
//   },
//   ingredientsTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginTop: 15,
//     marginBottom: 10,
//   },
//   ingredientsContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     elevation: 2,
//   },
//   ingredient: {
//     fontSize: 16,
//     color: '#444',
//     marginBottom: 5,
//   },
//   instructionsTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginTop: 15,
//     marginBottom: 10,
//   },
//   instructions: {
//     fontSize: 16,
//     color: '#444',
//     lineHeight: 24,
//     marginBottom: 20,
//   },
//   loadingIndicator: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//   },
//   errorText: {
//     fontSize: 16,
//     color: 'red',
//     textAlign: 'center',
//     marginTop: 20,
//   },
// });

// export default RecipeDetail;

// import React, { useEffect, useState } from 'react';
// import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator, Button, Alert } from 'react-native';
// import axios from 'axios';

// const API_KEY = '63c682ff12ab41a287c32e09c186decf'; // Your API Key
// const SERVER_URL = 'http://192.168.0.109:3000'; // Your server IP address

// const RecipeDetail = ({ route }) => {
//   const { recipe } = route.params; // Get the recipe data from navigation
//   const [details, setDetails] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch recipe details from the API
//   const fetchRecipeDetails = async () => {
//     try {
//       const response = await axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${API_KEY}`);
//       setDetails(response.data);
//     } catch (error) {
//       console.error('Error fetching recipe details:', error);
//       Alert.alert('Error', 'Failed to fetch recipe details.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Save recipe to favorites
//   const saveFavorite = async () => {
//     if (!details) {
//       Alert.alert('Error', 'No recipe details available to save.');
//       return;
//     }

//     try {
//       const userId = 1; // Replace with actual user ID logic if needed
//       const response = await axios.post(`${SERVER_URL}/favorites`, {
//         recipe_id: details.id,
//         user_id: userId,
//       });
//       if (response.status === 201) {
//         Alert.alert('Success', 'Recipe saved to favorites!');
//       }
//     } catch (error) {
//       console.error('Error saving favorite recipe:', error);
//       Alert.alert('Error', error.response?.data?.error || 'Failed to save favorite.');
//     }
//   };

//   useEffect(() => {
//     fetchRecipeDetails();
//   }, []);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#841584" style={styles.loadingIndicator} />;
//   }

//   if (!details) {
//     return <Text style={styles.errorText}>No details available.</Text>;
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <Image source={{ uri: details.image }} style={styles.image} />
//       <Text style={styles.title}>{details.title}</Text>
//       <Text style={styles.summary}>{details.summary.replace(/<[^>]+>/g, '')}</Text>
      
//       <Button title="Save to Favorites" onPress={saveFavorite} color="#841584" />

//       <Text style={styles.ingredientsTitle}>Ingredients:</Text>
//       <View style={styles.ingredientsContainer}>
//         {details.extendedIngredients.map((ingredient) => (
//           <Text key={ingredient.id} style={styles.ingredient}>
//             • {ingredient.original}
//           </Text>
//         ))}
//       </View>

//       <Text style={styles.instructionsTitle}>Instructions:</Text>
//       <Text style={styles.instructions}>
//         {details.instructions ? details.instructions.replace(/<[^>]+>/g, '') : 'No instructions available.'}
//       </Text>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   image: {
//     width: '100%',
//     height: 250,
//     borderRadius: 10,
//     marginBottom: 15,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   summary: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 15,
//     lineHeight: 24,
//   },
//   ingredientsTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginTop: 15,
//     marginBottom: 10,
//   },
//   ingredientsContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 15,
//     elevation: 2,
//     marginBottom: 20,
//   },
//   ingredient: {
//     fontSize: 16,
//     color: '#444',
//     marginBottom: 5,
//   },
//   instructionsTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginTop: 15,
//     marginBottom: 10,
//   },
//   instructions: {
//     fontSize: 16,
//     color: '#444',
//     lineHeight: 24,
//     marginBottom: 20,
//   },
//   loadingIndicator: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5',
//   },
//   errorText: {
//     fontSize: 16,
//     color: 'red',
//     textAlign: 'center',
//     marginTop: 20,
//   },
// });

// export default RecipeDetail;


import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator, Button, Alert } from 'react-native';
import axios from 'axios';

const API_KEY = '63c682ff12ab41a287c32e09c186decf'; // Your API Key
const SERVER_URL = 'http://192.168.0.109:3000'; // Your server IP address

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
