import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/UI/Button';
import { Input } from '../../components/UI/Input';
import { useAuth } from '../../contexts/AuthContext';

export const SignUp = () => {
  const navigate = useNavigate();
  const { signup, loading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      await signup(email, password, name);
      navigate('/dashboard');
    } catch {
      setError('Sign up failed. Please try again.');
    }
  };

  return (
    <div>
      <h2 style={{ color: '#ffffff', fontSize: 24, fontWeight: 600, marginBottom: 8, textAlign: 'center' }}>
        Create Account
      </h2>
      <p style={{ color: '#a1a1aa', fontSize: 14, textAlign: 'center', marginBottom: 32 }}>
        Get started with your free account
      </p>

      <form onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          placeholder="At least 6 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Repeat your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && (
          <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 12 }}>{error}</p>
        )}

        <Button fullWidth size="lg" type="submit" isLoading={loading}>
          Create Account
        </Button>
      </form>

      <p style={{ color: '#a1a1aa', fontSize: 13, textAlign: 'center', marginTop: 24 }}>
        Already have an account?{' '}
        <Link to="/auth/login" style={{ color: '#6366f1', textDecoration: 'none' }}>
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
