import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AddMultipleButton from './components/AddMultipleButton';
import ProductCard from './components/ProductCard';

export default function App() {
  return (
	<ProductCard title='Grapefruit' price='45' imagePath={require("./assets/Grapefruit.png")}/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
