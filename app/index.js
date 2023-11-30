import { StyleSheet, View, Text } from 'react-native';
import { Login } from "../components/Login/Login";
import { Link, Stack } from 'expo-router';
export default function App() {
  return (
    <Login />

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
