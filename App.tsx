import { Provider } from "react-redux";

import MainStackNavigation from "./components/MainStackNavigator";
import { store } from "./state/store";

export default function App() {
  return (
    <Provider store={store}>
      <MainStackNavigation />
    </Provider>
  );
}
