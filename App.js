import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function App() {
  const [status, setStatus] = useState('Press button to test...');

  const testFetch = async () => {
    setStatus('Fetching...');
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
      setStatus('Success! Received data.');
    } catch (error) {
      console.error(error);
      setStatus(`Failed: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 18, marginBottom: 20}}>Network Connectivity Test</Text>
      <Text style={{fontSize: 16, marginBottom: 20}}>{status}</Text>
      <Button title="Run Test" onPress={testFetch} />
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
    padding: 20,
  },
});
