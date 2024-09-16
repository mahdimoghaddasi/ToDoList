import { NextUIProvider } from "@nextui-org/react";
import RoutesConfig from "./routseConfig";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <NextUIProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter basename="/">
            <RoutesConfig />
          </BrowserRouter>
        </QueryClientProvider>
      </NextUIProvider>
    </>
  );
};
export default App;
