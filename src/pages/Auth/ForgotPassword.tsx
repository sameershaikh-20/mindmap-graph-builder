import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/UI/Button';
import { Input } from '../../components/UI/Input';
import { useAuth } from '../../contexts/AuthContext';

export const ForgotPassword = () => {
  const { resetPassword, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    await resetPassword(email);
    setSent(true);
  };

  if (sent) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ color: '#ffffff', fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
          Check Your Email
        </h2>
        <p style={{ color: '#a1a1aa', fontSize: 14, marginBottom: 24 }}>
          We&apos;ve sent a password reset link to {email}
        </p>
        <Link to="/auth/login" style={{ color: '#6366f1', fontSize: 14 }}>
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ color: '#ffffff', fontSize: 24, fontWeight: 600, marginBottom: 8, textAlign: 'center' }}>
        Reset Password
      </h2>
      <p style={{ color: '#a1a1aa', fontSize: 14, textAlign: 'center', marginBottom: 32 }}>
        Enter your email and we&apos;ll send you a reset link
      </p>

      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button fullWidth size="lg" type="submit" isLoading={loading}>
          Send Reset Link
        </Button>
      </form>

      <p style={{ color: '#a1a1aa', fontSize: 13, textAlign: 'center', marginTop: 24 }}>
        Remember your password?{' '}
        <Link to="/auth/login" style={{ color: '#6366f1', textDecoration: 'none' }}>
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
