import React, { useState } from 'react';
import Layout from '../components/Layout';
import Post, { PostProps } from '../components/Post';
import img1 from '../images/1.jpg';
import Image from 'next/image';
import { useRouter } from 'next/router';

type BlogProps = {
  feed: PostProps[];
  logoSrc: string;
  companyName: string;
  imageSrc: typeof img1;
  onLogin: (username: string, password: string) => void;
};

const Blog: React.FC<BlogProps> = ({ feed, logoSrc, imageSrc, onLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activeTab, setActiveTab] = useState('login');
  const router = useRouter();

  const onSignUp = async () => {
    
    if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      alert('All fields are required!');
      return false;
    }
    
    if (password !== confirmPassword) {
      alert('Password do not match!');
      return;
    }

    const data = {
      username,
      email,
      password,
    };

    try {
      const response = await fetch('/api/userAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        // Handle successful registration logic here.
        alert('Registration successful!');
        localStorage.setItem('userId', result.id);
        router.push('/wallet?userId='+result.id);
      } else {
        // Handle errors from the server here.
        alert(result.message || 'Registration failed!');
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
    }
  };

  const onLogins = async () => {
    
    if (!username.trim() ||  !password.trim() ) {
      alert('Invalid credentials!');
      return false;
    }
    const credentials = {
      username,
      password,
    };

    try {
      const response = await fetch('/api/userLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (response.ok) {
        // Handle successful registration logic here.
        alert('Login successful!');
        localStorage.setItem('userId', data.id);
        router.push('/wallet?userId='+data.id);
      } else {
        // Handle login failure.
        // Show an error message to the user.
        alert(data.message || 'Login failed.');
      }
    } catch (error) {
      alert('An error occured .please try again later.');
    }
  };

  return (
    <Layout>
      <div className="login-page">
        <header style={{ color: 'white' }}>
          <h1>Let's get started</h1>
          Trusted by millions, Crypto Account is a secure crypto account making use of
          the the world of web3 accessible to all.
        </header>
        <main>
          <div className="containers1">
            <Image
              src="/46.jpg"
              alt="Image Above Container"
              className="above-container-image"
              width={180}
              height={180}
            />
          </div>
          <div className="container">
            <div className="tabs">
              <button
                onClick={() => setActiveTab('login')}
                className={activeTab === 'login' ? 'active' : ''}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={activeTab === 'signup' ? 'active' : ''}
              >
                Sign Up
              </button>
            </div>
            {activeTab === 'login' && (
              <div className="form">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={onLogins}>Login</button>
              </div>
            )}
            {activeTab === 'signup' && (
              <div className="form">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                />
                <button onClick={onSignUp}>Sign Up</button>
              </div>
            )}
          </div>
        </main>
      </div>

      <style jsx>{`
        .login-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-color: #111f2c;
        }
        .logo{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1000
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
        .tabs {
          display: flex;
          margin-bottom: 20px;
        }
        .tabs button {
          flex: 1;
          padding: 10px;
          cursor: pointer;
          border: none;
          background-color: #f5f5f5;
          border-bottom: 2px solid transparent;
          transition: border-color 0.3s;
        }
        .tabs button.active {
          border-bottom-color: #0ed39e!important;
        }
        header {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .form input, .form button {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;      
        }
        .form button {
          cursor: pointer;
          background-color: #0ed39e!important;
          color: white;
          border: none;
        }
        .company-logo {
          width: 100px;
          margin-bottom: 20px;
        }
        .tabs button.active {
          border-bottom-color: navy;
        }
        form {
          display: flex;
          flex-direction: column;
        }
        button {
          background-color: white;
          color: black;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        button:hover {
          background-color: lightgray;
        }
      `}</style>
    </Layout>
  );
};

export default Blog;
