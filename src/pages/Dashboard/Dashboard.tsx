import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/UI/Button';
import { Card } from '../../components/UI/Card';
import { EmptyState } from '../../components/UI/EmptyState';
import { MapCard } from '../../components/MapCard/MapCard';
import { FiMap, FiLayers, FiActivity } from 'react-icons/fi';
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
    { label: 'Total Maps', value: stats.totalMaps, icon: FiMap },
    { label: 'Total Nodes', value: stats.totalNodes, icon: FiLayers },
    { label: 'Active This Week', value: stats.recentActivity, icon: FiActivity },
  ];

  return (
    <div style={{ padding: '32px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ color: '#ffffff', marginBottom: 4, fontSize: 22, fontWeight: 600 }}>
          Welcome!
        </h1>
        <p style={{ color: '#a1a1aa', fontSize: 13 }}>
          {maps.length > 0
            ? `You have ${maps.length} mind map${maps.length !== 1 ? 's' : ''}`
            : 'Create your first mind map to get started'}
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 12,
          marginBottom: 28,
        }}
      >
        {statItems.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} padding={14}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 6,
                    background: 'rgba(99,102,241,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6366f1',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={16} />
                </div>
                <div>
                  <p style={{ color: '#a1a1aa', fontSize: 11, margin: 0 }}>{stat.label}</p>
                  <p style={{ color: '#ffffff', fontSize: 22, fontWeight: 600, margin: 0 }}>{stat.value}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div style={{ marginBottom: 24, display: 'flex', gap: 12 }}>
        <Button onClick={createNewMap}>+ New Map</Button>
        <Button variant="outline" onClick={() => navigate('/templates')}>
          Browse Templates
        </Button>
      </div>

      <div>
        <h2 style={{ color: '#ffffff', marginBottom: 16, fontSize: 18, fontWeight: 600 }}>Recent Maps</h2>
        {maps.length === 0 ? (
          <EmptyState
            title="No maps yet"
            description="Create your first mind map to get started"
            action={{ label: 'Create Your First Map', onClick: createNewMap }}
          />
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
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
