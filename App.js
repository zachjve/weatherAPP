import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

import CurrentWeather from './components/Weather';
import Forecasts from './components/Forecasts';

export default function App() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        return
      }

      const userLocation = await Location.getCurrentPositionAsync()
      getWeather(userLocation)
    }

    getLocation()
  }, [])

  const getWeather = async (location) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=4cd715d145d0146d3005370780e530f8&lang=fr&units=metric`)

      setData(response.data)
      setLoading(false)
    }
    catch(err) {
      console.log("Pas de reponse de l'API " + err)
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CurrentWeather data={data} />
      <Forecasts data={data} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
});
