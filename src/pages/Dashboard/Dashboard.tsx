import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/UI/Button';
import { MapCard } from '../../components/MapCard/MapCard';
import { FiMap, FiLayers, FiActivity, FiPlus, FiGrid } from 'react-icons/fi';
import type { MapMeta } from '../../types/maps';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [maps] = useState<MapMeta[]>(() => {
    const stored = localStorage.getItem('userMaps');
    return stored ? JSON.parse(stored) : [];
  });

  const createNewMap = () => {
    const id = crypto.randomUUID();
    const newMap: MapMeta = {
      id,
      name: 'Untitled Map',
      lastModified: new Date(),
      createdAt: new Date(),
      nodeCount: 1,
    };
    const updated = [...maps, newMap];
    localStorage.setItem('userMaps', JSON.stringify(updated));
    navigate(`/editor/${id}`);
  };

  const stats = {
    totalMaps: maps.length,
    totalNodes: maps.reduce((sum, m) => sum + m.nodeCount, 0),
    recentActivity: maps.filter(
      (m) => Date.now() - new Date(m.lastModified).getTime() < 7 * 24 * 60 * 60 * 1000
    ).length,
  };

  const statItems = [
    { label: 'Total Maps', value: stats.totalMaps, icon: FiMap, color: '#6366f1', gradient: 'linear-gradient(135deg, #6366f1, #4f46e5)' },
    { label: 'Total Nodes', value: stats.totalNodes, icon: FiLayers, color: '#ec4899', gradient: 'linear-gradient(135deg, #ec4899, #db2777)' },
    { label: 'Active This Week', value: stats.recentActivity, icon: FiActivity, color: '#14b8a6', gradient: 'linear-gradient(135deg, #14b8a6, #0d9488)' },
  ];

  return (
    <div style={{ padding: '32px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: 36, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ color: '#ffffff', marginBottom: 6, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>
            Welcome back!
          </h1>
          <p style={{ color: '#a1a1aa', fontSize: 14 }}>
            {maps.length > 0
              ? `You have ${maps.length} mind map${maps.length !== 1 ? 's' : ''}`
              : 'Create your first mind map to get started'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button icon={<FiPlus size={16} />} onClick={createNewMap}>
            New Map
          </Button>
          <Button variant="secondary" icon={<FiGrid size={16} />} onClick={() => navigate('/templates')}>
            Templates
          </Button>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 16,
          marginBottom: 36,
        }}
      >
        {statItems.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`fade-in-up-d${i + 1}`}
              style={{
                background: '#2a2a4a',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.06)',
                padding: '20px 20px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${stat.color}30`;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 4, background: stat.gradient, borderRadius: '12px 0 0 12px' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: `${stat.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: stat.color,
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <p style={{ color: '#a1a1aa', fontSize: 12, margin: '0 0 2px', fontWeight: 500 }}>{stat.label}</p>
                  <p style={{ color: '#ffffff', fontSize: 26, fontWeight: 700, margin: 0, letterSpacing: '-0.02em' }}>{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div>
        <h2 style={{ color: '#ffffff', marginBottom: 20, fontSize: 18, fontWeight: 600 }}>Recent Maps</h2>
        {maps.length === 0 ? (
          <div style={{
            background: '#2a2a4a',
            borderRadius: 16,
            border: '2px dashed rgba(255,255,255,0.1)',
            padding: '64px 32px',
            textAlign: 'center',
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: 16,
              background: 'rgba(99,102,241,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px', color: '#6366f1',
            }}>
              <FiMap size={28} />
            </div>
            <h3 style={{ color: '#ffffff', fontSize: 18, fontWeight: 600, marginBottom: 8 }}>No maps yet</h3>
            <p style={{ color: '#a1a1aa', fontSize: 14, marginBottom: 28, maxWidth: 360, margin: '0 auto 28px' }}>
              Create your first mind map to start organizing your ideas visually
            </p>
            <Button icon={<FiPlus size={16} />} onClick={createNewMap}>Create Your First Map</Button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 16,
            }}
          >
            {maps.map((map) => (
              <MapCard
                key={map.id}
                map={map}
                onClick={() => navigate(`/editor/${map.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
