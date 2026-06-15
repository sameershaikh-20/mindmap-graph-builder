import { useState } from 'react';
import { Input } from '../../components/UI/Input';
import { Button } from '../../components/UI/Button';
import { FiUser, FiEdit2, FiCheck } from 'react-icons/fi';

export const Profile = () => {
  const [name, setName] = useState(() => localStorage.getItem('profileName') || 'User');
  const [bio, setBio] = useState(() => localStorage.getItem('profileBio') || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem('profileName', name);
    localStorage.setItem('profileBio', bio);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ padding: '32px', maxWidth: 700, margin: '0 auto' }}>
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ color: '#ffffff', fontSize: 26, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.02em' }}>
          Profile
        </h1>
        <p style={{ color: '#a1a1aa', fontSize: 14 }}>
          Manage your account settings
        </p>
      </div>

      {/* Avatar card */}
      <div style={{
        background: '#2a2a4a', borderRadius: 14,
        border: '1px solid rgba(255,255,255,0.06)',
        padding: 32, marginBottom: 20,
        display: 'flex', alignItems: 'center', gap: 24,
      }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366f1, #ec4899)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: 32, fontWeight: 700,
          boxShadow: '0 0 0 4px rgba(99,102,241,0.2), 0 8px 24px rgba(99,102,241,0.25)',
          flexShrink: 0,
          position: 'relative',
        }}>
          {name.charAt(0).toUpperCase()}
          <div style={{
            position: 'absolute', bottom: 0, right: 0,
            width: 24, height: 24, borderRadius: '50%',
            background: '#2a2a4a', border: '2px solid #6366f1',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#6366f1',
          }}>
            <FiEdit2 size={10} />
          </div>
        </div>
        <div>
          <h2 style={{ color: '#ffffff', fontSize: 20, fontWeight: 600, margin: '0 0 4px' }}>{name}</h2>
          <p style={{ color: '#a1a1aa', fontSize: 14, margin: 0 }}>
            {bio || 'No bio added yet'}
          </p>
        </div>
      </div>

      {/* Form card */}
      <div style={{
        background: '#2a2a4a', borderRadius: 14,
        border: '1px solid rgba(255,255,255,0.06)',
        padding: 28, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 4, background: 'linear-gradient(180deg, #6366f1, #4f46e5)', borderRadius: '14px 0 0 14px' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: 'rgba(99,102,241,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#6366f1',
          }}>
            <FiUser size={18} />
          </div>
          <h3 style={{ color: '#ffffff', fontSize: 16, fontWeight: 600, margin: 0 }}>Personal Information</h3>
        </div>

        <Input
          label="Display Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
        <Input
          label="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us about yourself"
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
          <Button
            onClick={handleSave}
            icon={saved ? <FiCheck size={16} /> : undefined}
          >
            {saved ? 'Saved!' : 'Save Changes'}
          </Button>
          {saved && (
            <span style={{ color: '#22c55e', fontSize: 13, fontWeight: 500 }}>
              Changes saved successfully
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
