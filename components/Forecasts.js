import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, ScrollView, Text, View } from 'react-native';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const getIcon = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`

export default function Forecasts({ data }) {
    const [forecasts, setForecast] = useState([])

    useEffect(() => {
        const forecastsData = data.list.map(forecast => {
            const dt = new Date(forecast.dt * 1000)
            return ({
                date: dt,
                hour: dt.getHours(),
                temp: Math.round(forecast.main.temp),
                icon: forecast.weather[0].icon,
                name: format(dt, "EEEE", { locale: fr })
            })
        })
        setForecast(forecastsData)
    }, [data])

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            {forecasts.map((forecast, index) => (
                <View style={styles.forecastItem} key={index}>
                    <Text>{ forecast.name }</Text>
                    <Text style={styles.date}>{ forecast.hour }h</Text>

                    <Image 
                        style={styles.icon} 
                        source={{ uri: getIcon(forecast?.icon) }}>
                    </Image>

                    <Text style={styles.temperature}>{ forecast.temp }°C</Text>
                </View>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    forecastItem: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
      marginVertical: 20
    },
    icon: {
      width: 50,
      height: 50,
      marginVertical: 10
    },
    temperature: {
      fontSize: 18,
      fontWeight: 'bold'
    },
    date: {
      fontSize: 16,
      marginVertical: 5
    }
  });