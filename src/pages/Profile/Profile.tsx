import { useState } from 'react';
import { Card } from '../../components/UI/Card';
import { Input } from '../../components/UI/Input';
import { Button } from '../../components/UI/Button';

export const Profile = () => {
  const [name, setName] = useState('User');
  const [bio, setBio] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem('profileName', name);
    localStorage.setItem('profileBio', bio);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ padding: '32px', maxWidth: 700, margin: '0 auto' }}>
      <h1 style={{ color: '#ffffff', fontSize: 24, fontWeight: 600, marginBottom: 32 }}>
        Profile
      </h1>

      <Card padding={24}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #ec4899)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 24,
            fontWeight: 600,
            marginBottom: 24,
          }}
        >
          {name.charAt(0).toUpperCase()}
        </div>

        <Input
          label="Display Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us about yourself"
        />

        <Button onClick={handleSave}>{saved ? 'Saved!' : 'Save Changes'}</Button>
      </Card>
    </div>
  );
};

export default Profile;
