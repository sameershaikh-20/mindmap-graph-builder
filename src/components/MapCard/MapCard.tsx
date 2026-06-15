import React, { useState, useRef, useEffect } from 'react';
import { Card } from '../UI/Card';
import { Badge } from '../UI/Badge';
import { FiMoreVertical, FiEdit2, FiCopy, FiTrash2 } from 'react-icons/fi';
import type { MapMeta } from '../../types/maps';

interface MapCardProps {
  map: MapMeta;
  onClick: () => void;
}

export const MapCard = React.memo(function MapCard({ map, onClick }: MapCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [newName, setNewName] = useState(map.name);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastModified = new Date(map.lastModified);
  const timeAgo = Math.floor((Date.now() - lastModified.getTime()) / (1000 * 60 * 60));
  const timeStr = timeAgo < 1 ? 'Just now' : timeAgo < 24 ? `${timeAgo}h ago` : `${Math.floor(timeAgo / 24)}d ago`;

  useEffect(() => {
    if (renaming && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [renaming]);

  const updateMaps = (updater: (maps: MapMeta[]) => MapMeta[]) => {
    const maps: MapMeta[] = JSON.parse(localStorage.getItem('userMaps') || '[]');
    localStorage.setItem('userMaps', JSON.stringify(updater(maps)));
    window.location.reload();
  };

  const handleRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);
    setRenaming(true);
    setNewName(map.name);
  };

  const handleSaveRename = () => {
    const trimmed = newName.trim();
    if (trimmed && trimmed !== map.name) {
      updateMaps((maps) =>
        maps.map((m) => (m.id === map.id ? { ...m, name: trimmed, lastModified: new Date() } : m))
      );
    }
    setRenaming(false);
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);
    const maps: MapMeta[] = JSON.parse(localStorage.getItem('userMaps') || '[]');
    const newMap: MapMeta = {
      ...map,
      id: crypto.randomUUID(),
      name: `${map.name} (Copy)`,
      lastModified: new Date(),
      createdAt: new Date(),
    };
    localStorage.setItem('userMaps', JSON.stringify([...maps, newMap]));
    window.location.reload();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(false);
    updateMaps((maps) => maps.filter((m) => m.id !== map.id));
  };

  return (
    <Card
      hover
      padding={0}
      onClick={onClick}
      style={{ overflow: menuOpen ? 'visible' : 'hidden', position: 'relative' }}
    >
      <div
        style={{
          height: 60,
          background: '#2a2a4a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          padding: '0 20px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ width: 32, height: 6, borderRadius: 3, background: '#6366f1', opacity: 0.6 }} />
          <div style={{ width: 20, height: 6, borderRadius: 3, background: '#ec4899', opacity: 0.6 }} />
          <div style={{ width: 24, height: 6, borderRadius: 3, background: '#14b8a6', opacity: 0.6 }} />
        </div>
        <svg width="50" height="40" viewBox="0 0 50 40" fill="none">
          <circle cx="10" cy="20" r="4" fill="#6366f1" opacity="0.5" />
          <circle cx="25" cy="10" r="3" fill="#ec4899" opacity="0.5" />
          <circle cx="40" cy="22" r="3.5" fill="#14b8a6" opacity="0.5" />
          <line x1="14" y1="20" x2="22" y2="11" stroke="#a1a1aa" strokeWidth="1" opacity="0.3" />
          <line x1="28" y1="10" x2="37" y2="21" stroke="#a1a1aa" strokeWidth="1" opacity="0.3" />
        </svg>
      </div>
      <div style={{ padding: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
          {renaming ? (
            <input
              ref={inputRef}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onBlur={handleSaveRename}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveRename();
                if (e.key === 'Escape') setRenaming(false);
              }}
              onClick={(e) => e.stopPropagation()}
              style={{
                flex: 1,
                background: '#1a1a2e',
                border: '1px solid #6366f1',
                borderRadius: 4,
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                padding: '2px 6px',
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
              }}
            />
          ) : (
            <h3 style={{ margin: 0, color: '#ffffff', fontSize: 14, fontWeight: 600, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {map.name}
            </h3>
          )}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <button
              onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
              style={{
                background: 'none',
                border: 'none',
                color: '#a1a1aa',
                cursor: 'pointer',
                padding: 2,
                display: 'flex',
                alignItems: 'center',
                borderRadius: 4,
              }}
            >
              <FiMoreVertical size={14} />
            </button>
            {menuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  background: '#2a2a4a',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 6,
                  padding: 4,
                  minWidth: 130,
                  zIndex: 10,
                }}
              >
                <button
                  onClick={handleRename}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '6px 10px',
                    background: 'none', border: 'none', color: '#a1a1aa', cursor: 'pointer', fontSize: 12,
                    fontFamily: 'Inter, sans-serif', borderRadius: 4,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
                >
                  <FiEdit2 size={12} /> Rename
                </button>
                <button
                  onClick={handleDuplicate}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '6px 10px',
                    background: 'none', border: 'none', color: '#a1a1aa', cursor: 'pointer', fontSize: 12,
                    fontFamily: 'Inter, sans-serif', borderRadius: 4,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
                >
                  <FiCopy size={12} /> Duplicate
                </button>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '2px 0' }} />
                <button
                  onClick={handleDelete}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '6px 10px',
                    background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 12,
                    fontFamily: 'Inter, sans-serif', borderRadius: 4,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.15)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
                >
                  <FiTrash2 size={12} /> Delete
                </button>
              </div>
            )}
          </div>
        </div>
        <p style={{ color: '#666', fontSize: 11, margin: '0 0 6px' }}>
          Edited {timeStr}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Badge>{map.nodeCount} nodes</Badge>
        </div>
      </div>
    </Card>
  );
});
