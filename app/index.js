import { StyleSheet, View, Text } from 'react-native';
import { Login } from "../components/Login/Login";
import { Menu } from "../components/Menu/Menu";
import {Hamb } from "../components/Hamb/Hamb";
import { Link, Stack } from 'expo-router';
export default function App() {
  return (
    <Menu />

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
