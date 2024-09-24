import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CustomSplashScreen from './src/SplashScreen';
import SearchPage from './src/SearchPage';
import RecipeList from './src/RecipeList';
import RecipeDetail from './src/RecipeDetail';
import Favorites from './src/Favorites'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={CustomSplashScreen} />
        <Stack.Screen name="RecipeList" component={RecipeList} />
        <Stack.Screen name="Search" component={SearchPage} />
        <Stack.Screen name="Favorites" component={Favorites} options={{ title: 'Favorites' }} />
        <Stack.Screen 
          name="RecipeDetail" 
          component={RecipeDetail} 
          options={{ title: 'Recipe Details' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
