import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const CustomSplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (SplashScreen) {
        SplashScreen.hide(); // Hide splash screen
      }
      navigation.replace('Search'); // Navigate to Search screen after splash
    }, 3000); // Show splash for 3 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/splash1.jpg')} // Correct relative path to the image
        style={styles.splashImage}
      />
      <Text style={styles.title}>Welcome To Recipe App Enjoy!!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  splashImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default CustomSplashScreen;
