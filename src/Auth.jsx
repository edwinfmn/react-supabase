import React, { useState } from 'react';
import { supabase } from './utils/supabase';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Sign-up successful! Please check your email to confirm.');
    }
  };

  // Sign in with Email and Password
  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Sign-in successful!');
    }
  };

  // Sign in with Google
  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  // Log out
  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Logged out successfully.');
    }
  };

  return (
    <div>
      <h1>Supabase Authentication</h1>

      <div>
        <h2>Email/Password</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignUp}>Sign Up</button>
        <button onClick={handleSignIn}>Sign In</button>
      </div>

      <div>
        <h2>Google OAuth</h2>
        <button onClick={handleGoogleSignIn}>Sign In with Google</button>
      </div>

      <div>
        <h2>Log Out</h2>
        <button onClick={handleLogOut}>Log Out</button>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Auth;
