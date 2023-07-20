import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [vouchers, setVouchers] = useState([]);
  const [voucherCode, setVoucherCode] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/register', {
        username,
        email,
        password,
      });
      console.log(response.data);
    } catch (err) {
      console.error(err.response.data.error);
    }
  };
  const handleUseVoucher = async () => {
    try {
      await axios.post(
        'http://localhost:3001/use-voucher',
        { voucherCode },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      alert('Voucher berhasil digunakan');
      getVouchers();
    } catch (err) {
      console.error(err.response.data.error);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email: loginEmail,
        password: loginPassword,
      });
      setAccessToken(response.data.accessToken);
    } catch (err) {
      console.error(err.response.data.error);
    }
  };

  const handleGenerateVoucher = async () => {
    try {
      await axios.post('http://localhost:3001/generate-voucher', null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      alert('Voucher berhasil di-generate');
    } catch (err) {
      console.error(err.response.data.error);
    }
  };

  const getVouchers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/vouchers', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setVouchers(response.data);
    } catch (err) {
      console.error(err.response.data.error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Register</button>
      </form>

      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>

      {accessToken && (
        <div>
          <h2>Vouchers</h2>
          <button onClick={getVouchers}>Get Vouchers</button>
          <ul>
            {vouchers.map((voucher) => (
              <li key={voucher.id}>{voucher.code}</li>
            ))}
          </ul>
          <button onClick={handleGenerateVoucher}>Generate Voucher</button>
          <h2>Use Voucher</h2>
          <input
            type="text"
            placeholder="Voucher Code"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
          />
          <button onClick={handleUseVoucher}>Use Voucher</button>
        </div>
        
      )}
    </div>
  );
}

export default App;
