import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import axios from 'axios'

export default function App () {
  let [quote, setQuote] = React.useState('')
  let [source, setSource] = React.useState('')

  const fetchApiCall = () => {
    fetch('https://quotes15.p.rapidapi.com/quotes/random/?language_code=en', {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'quotes15.p.rapidapi.com',
        'x-rapidapi-key': '8d6e2c9909msh7adbb12c9ed4274p1d0e4ajsn8d9f2fedec8c'
      }
    })
      .then(response => response.json())
      .then(response => {
        setQuote(response.content)
        setSource(response.originator.name)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const axiosApiCall = () => {
    axios({
      method: 'GET',
      url: 'https://quotes15.p.rapidapi.com/quotes/random/',
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'quotes15.p.rapidapi.com',
        'x-rapidapi-key': '8d6e2c9909msh7adbb12c9ed4274p1d0e4ajsn8d9f2fedec8c',
        useQueryString: true
      },
      params: {
        language_code: 'en'
      }
    })
      .then(response => {
        setQuote(response.data.content)
        setSource(response.data.originator.name)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Making Api call with Fetch and Axios</Text>
      <TouchableHighlight onPress={fetchApiCall}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Use Fetch API</Text>
        </View>
      </TouchableHighlight>
      <Text>OR</Text>
      <TouchableHighlight onPress={axiosApiCall}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Use Axios</Text>
        </View>
      </TouchableHighlight>
      <View>
        <Text style={styles.quote}>{quote}</Text>
        <Text style={styles.source}>{source}</Text>
      </View>
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    padding: 10,
    marginVertical: 15,
    backgroundColor: '#0645AD'
  },
  buttonText: {
    color: '#fff'
  },
  quote: {
    fontSize: 17,
    textAlign: 'center',
    fontStyle: 'italic'
  },
  source: {
    textAlign: 'right',
    marginTop: 15
  },
  quoteContainer: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5
  }
})
