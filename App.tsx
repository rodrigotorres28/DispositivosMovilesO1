import MainStackNavigation from './components/MainStackNavigator';
import { Provider } from 'react-redux';
import { store } from './state/store';

export default function App() {
  return (
      <Provider store={store}>
        <MainStackNavigation/>
      </Provider>
  );
}

