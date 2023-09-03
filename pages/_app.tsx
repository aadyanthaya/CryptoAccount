import { AppProps } from "next/app";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Component {...pageProps} />
    
  );
};

export default App;
