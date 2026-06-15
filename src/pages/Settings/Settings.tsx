import { useState } from 'react';
import { Card } from '../../components/UI/Card';

export const Settings = () => {
  const [theme] = useState('dark');
  const [autoSaveInterval] = useState(30);

  return (
    <div style={{ padding: '32px', maxWidth: 700, margin: '0 auto' }}>
      <h1 style={{ color: '#ffffff', fontSize: 24, fontWeight: 600, marginBottom: 32 }}>
        Settings
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Card padding={24}>
          <h3 style={{ color: '#ffffff', fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Appearance</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#a1a1aa', fontSize: 14 }}>Theme</span>
            <span style={{ color: '#ffffff', fontSize: 14, textTransform: 'capitalize' }}>{theme}</span>
          </div>
        </Card>

        <Card padding={24}>
          <h3 style={{ color: '#ffffff', fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Workspace</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#a1a1aa', fontSize: 14 }}>Auto-save Interval</span>
            <span style={{ color: '#ffffff', fontSize: 14 }}>{autoSaveInterval}s</span>
          </div>
        </Card>

        <Card padding={24}>
          <h3 style={{ color: '#ffffff', fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Data & Privacy</h3>
          <p style={{ color: '#a1a1aa', fontSize: 13 }}>
            Your data is stored locally in your browser. No data is sent to external servers.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
