import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, Text, View } from 'react-native';
import { isSameDay } from 'date-fns';

const getIcon = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png` 

export default function CurrentWeather({ data }) {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        const setCurrentWeather = data.list.filter(forecast => {
            const today = new Date().getTime() + Math.abs(data.city.timezone * 1000)
            const forecastDate = new Date(forecast.dt * 1000)
            return isSameDay(today, forecastDate)
        })
        setWeather(setCurrentWeather[0])

    }, [data])

    return(
        <View style={styles.container}>
            <Text>{data?.city?.name}</Text>

            <Image 
                style={styles.icon} 
                source={{ uri: getIcon(weather?.weather[0].icon) }}>
            </Image>

            <Text>{Math.round(weather?.main.temp)} C°</Text>
            <Text>{weather?.weather[0].description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 100,
        height: 100,
    },
});