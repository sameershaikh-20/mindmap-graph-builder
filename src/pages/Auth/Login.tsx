import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/UI/Button';
import { Input } from '../../components/UI/Input';
import { useAuth } from '../../contexts/AuthContext';

export const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div>
      <h2 style={{ color: '#ffffff', fontSize: 24, fontWeight: 600, marginBottom: 8, textAlign: 'center' }}>
        Welcome Back
      </h2>
      <p style={{ color: '#a1a1aa', fontSize: 14, textAlign: 'center', marginBottom: 32 }}>
        Sign in to your account to continue
      </p>

      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 12 }}>{error}</p>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
          <Link
            to="/auth/forgot-password"
            style={{ color: '#6366f1', fontSize: 13, textDecoration: 'none' }}
          >
            Forgot password?
          </Link>
        </div>

        <Button fullWidth size="lg" type="submit" isLoading={loading}>
          Sign In
        </Button>
      </form>

      <p style={{ color: '#a1a1aa', fontSize: 13, textAlign: 'center', marginTop: 24 }}>
        Don&apos;t have an account?{' '}
        <Link to="/auth/signup" style={{ color: '#6366f1', textDecoration: 'none' }}>
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
