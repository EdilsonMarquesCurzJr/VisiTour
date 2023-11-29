import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Login } from "../components/Login/Login";

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
