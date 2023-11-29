import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Login } from "./src/componentes/screens/login/index.js"

export default function App() {
  return (
    <>
      <Login/>
      
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});
