import React, { useState } from "react";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import img1 from "../images/1.jpg";
import Image from 'next/image'
import { useRouter } from 'next/router';

function Thanks(){
    const router = useRouter();
    const onLogin = () => {  router.push('/');};
return(

<Layout>
  <div className="thankyou-page">
    <header style={{ color: 'white' }}>
      <h1>Thank You!</h1>
      Trusted by millions, Crypto Account is a secure wallet making the world of web3 accessible to all.
    </header>

    <main>
      <div className="container">
      <button onClick={onLogin}>Back to Wallet</button> 
      </div>
    </main>
  </div>
     
  <style jsx>{`
    .thankyou-page {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background-color: #111f2c;
    }
    .container {
      width: 300px;
      margin: 50px auto;
      padding: 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      background-color: #f2f5f8;
    }
    .containers1 {
      width: 200px;
      margin: 50px auto;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    header {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    button {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      cursor: pointer;
      background-color: #0ed39e;
      color: white;
      transition: background-color 0.3s;
    }
    button:hover {
      background-color: lightgray;
    }
  `}</style>
</Layout>





);


};


export default Thanks;