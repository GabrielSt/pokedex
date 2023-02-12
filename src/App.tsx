import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Home from "./pages/Home";
import { RecoilRoot } from "recoil";

function App() {
  const client = new ApolloClient({
    uri: "https://graphql-pokemon2.vercel.app",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <div className="App">
          <Home />
        </div>
      </RecoilRoot>
    </ApolloProvider>
  );
}

export default App;
