import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { isSameDay } from 'date-fns';

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
        <View>
            <Text>{data?.city?.name}</Text>
            <Text>Aujourd'hui</Text>
            <Text>{Math.round(weather?.main.temp)} C°</Text>
            <Text>{weather?.weather[0].description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({

});