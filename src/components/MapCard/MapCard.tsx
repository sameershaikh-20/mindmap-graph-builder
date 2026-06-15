import React, { useState, useRef, useEffect } from 'react';
import { Card } from '../UI/Card';
import { Badge } from '../UI/Badge';
import { FiMoreVertical, FiEdit2, FiCopy, FiTrash2 } from 'react-icons/fi';
import type { MapMeta } from '../../types/maps';

interface MapCardProps {
  map: MapMeta;
  onClick: () => void;
}

const thumbnailColors = ['#6366f1', '#ec4899', '#14b8a6', '#f59e0b', '#8b5cf6'];

export const MapCard = React.memo(function MapCard({ map, onClick }: MapCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [newName, setNewName] = useState(map.name);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastModified = new Date(map.lastModified);
  const timeAgo = Math.floor((Date.now() - lastModified.getTime()) / (1000 * 60 * 60));
  const timeStr = timeAgo < 1 ? 'Just now' : timeAgo < 24 ? `${timeAgo}h ago` : `${Math.floor(timeAgo / 24)}d ago`;

  const seed = map.id.charCodeAt(0) % thumbnailColors.length;
  const accentColor = thumbnailColors[seed];

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
    <div
      onClick={onClick}
      style={{
        background: '#2a2a4a',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.06)',
        overflow: menuOpen ? 'visible' : 'hidden',
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Gradient thumbnail */}
      <div
        style={{
          height: 80,
          background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}08)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, opacity: 0.12 }}>
          <svg width="100%" height="100%" viewBox="0 0 200 80">
            <circle cx="60" cy="40" r="12" fill={accentColor} />
            <circle cx="100" cy="25" r="8" fill="#ec4899" />
            <circle cx="140" cy="50" r="10" fill="#14b8a6" />
            <line x1="72" y1="40" x2="92" y2="27" stroke="#a1a1aa" strokeWidth="1.5" opacity="0.4" />
            <line x1="108" y1="27" x2="130" y2="48" stroke="#a1a1aa" strokeWidth="1.5" opacity="0.4" />
          </svg>
        </div>
        {/* Node count badge */}
        <div style={{
          position: 'absolute', top: 10, right: 10,
          background: 'rgba(0,0,0,0.4)', borderRadius: 6,
          padding: '3px 8px', fontSize: 11, color: '#fff', fontWeight: 500,
        }}>
          {map.nodeCount} nodes
        </div>
      </div>

      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
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
                borderRadius: 6,
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                padding: '4px 8px',
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
                background: 'none', border: 'none', color: '#666',
                cursor: 'pointer', padding: 4, display: 'flex',
                alignItems: 'center', borderRadius: 6,
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#a1a1aa'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#666'; }}
            >
              <FiMoreVertical size={14} />
            </button>
            {menuOpen && (
              <div
                style={{
                  position: 'absolute', bottom: '100%', right: 0, marginBottom: 4,
                  background: '#2a2a4a', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8, padding: 4, minWidth: 140, zIndex: 10,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                }}
              >
                <button
                  onClick={handleRename}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '8px 12px',
                    background: 'none', border: 'none', color: '#a1a1aa', cursor: 'pointer', fontSize: 13,
                    fontFamily: 'Inter, sans-serif', borderRadius: 6,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
                >
                  <FiEdit2 size={13} /> Rename
                </button>
                <button
                  onClick={handleDuplicate}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '8px 12px',
                    background: 'none', border: 'none', color: '#a1a1aa', cursor: 'pointer', fontSize: 13,
                    fontFamily: 'Inter, sans-serif', borderRadius: 6,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
                >
                  <FiCopy size={13} /> Duplicate
                </button>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '4px 0' }} />
                <button
                  onClick={handleDelete}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '8px 12px',
                    background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 13,
                    fontFamily: 'Inter, sans-serif', borderRadius: 6,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
                >
                  <FiTrash2 size={13} /> Delete
                </button>
              </div>
            )}
          </div>
        </div>
        <p style={{ color: '#666', fontSize: 12, margin: 0 }}>
          Edited {timeStr}
        </p>
      </div>
    </div>
  );
});
