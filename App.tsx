import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Provider } from "react-redux";

import MainStackNavigation from "./components/MainStackNavigator";
import { store } from "./state/store";

// Create a query client
const queryClient = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MainStackNavigation />
      </QueryClientProvider>
    </Provider>
  );
}
