import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/UI/Button';
import { FiBriefcase, FiStar, FiBook, FiClock, FiTrendingUp, FiMap } from 'react-icons/fi';
import type { Node } from '../../types';

interface TemplateDef {
  name: string;
  description: string;
  icon: typeof FiBriefcase;
  color: string;
  category: string;
  nodes: Record<string, Node>;
  rootNodeId: string;
}

const uid = () => crypto.randomUUID();

function makeTemplate(rootTitle: string, color: string, children: { title: string; subchildren?: string[] }[]): { nodes: Record<string, Node>; rootNodeId: string } {
  const rootId = uid();
  const childIds: string[] = [];
  const nodes: Record<string, Node> = {};

  const now = new Date();

  children.forEach((child, ci) => {
    const childId = uid();
    childIds.push(childId);
    const subchildIds: string[] = [];

    if (child.subchildren) {
      child.subchildren.forEach((sub) => {
        const subId = uid();
        subchildIds.push(subId);
        nodes[subId] = {
          id: subId,
          parentId: childId,
          childrenIds: [],
          x: 600 + ci * 250,
          y: -200 + ci * 120 + child.subchildren!.indexOf(sub) * 80,
          title: sub,
          color,
          isCollapsed: false,
          depth: 2,
          metadata: { createdAt: now, updatedAt: now, tags: [] },
        };
      });
    }

    nodes[childId] = {
      id: childId,
      parentId: rootId,
      childrenIds: subchildIds,
      x: 350,
      y: -200 + ci * 150,
      title: child.title,
      color,
      isCollapsed: false,
      depth: 1,
      metadata: { createdAt: now, updatedAt: now, tags: [] },
    };
  });

  nodes[rootId] = {
    id: rootId,
    parentId: null,
    childrenIds: childIds,
    x: 0,
    y: 0,
    title: rootTitle,
    color,
    isCollapsed: false,
    depth: 0,
    metadata: { createdAt: now, updatedAt: now, tags: [] },
  };

  return { nodes, rootNodeId: rootId };
}

const MiniMapPreview = ({ color, childCount }: { color: string; childCount: number }) => (
  <svg width="100%" height="60" viewBox="0 0 200 60" fill="none" style={{ margin: '12px 0 8px', opacity: 0.7 }}>
    <circle cx="100" cy="30" r="8" fill={color} opacity="0.9" />
    {[...Array(Math.min(childCount, 3))].map((_, i) => {
      const angle = ((i - (childCount - 1) / 2) * 30) * (Math.PI / 180);
      const x = 100 + Math.cos(angle) * 55;
      const y = 30 + Math.sin(angle) * 35;
      return (
        <g key={i}>
          <line x1="100" y1="30" x2={x} y2={y} stroke={color} strokeWidth="1.5" opacity="0.4" />
          <circle cx={x} cy={y} r="5" fill={color} opacity="0.6" />
        </g>
      );
    })}
  </svg>
);

const templates: TemplateDef[] = [
  {
    name: 'Project Plan',
    description: 'Organize project tasks and milestones',
    icon: FiBriefcase,
    color: '#6366f1',
    category: 'Business',
    ...makeTemplate('Project Plan', '#6366f1', [
      { title: 'Planning', subchildren: ['Requirements', 'Timeline', 'Resources'] },
      { title: 'Development', subchildren: ['Frontend', 'Backend', 'Testing'] },
      { title: 'Launch', subchildren: ['Deployment', 'Marketing', 'Feedback'] },
    ]),
  },
  {
    name: 'Brainstorming',
    description: 'Capture and organize creative ideas',
    icon: FiStar,
    color: '#ec4899',
    category: 'Creative',
    ...makeTemplate('Brainstorm', '#ec4899', [
      { title: 'Core Idea', subchildren: ['What', 'Why', 'How'] },
      { title: 'Ideas', subchildren: ['Idea 1', 'Idea 2', 'Idea 3'] },
      { title: 'Next Steps', subchildren: ['Research', 'Prototype', 'Validate'] },
    ]),
  },
  {
    name: 'Study Notes',
    description: 'Structure your study materials',
    icon: FiBook,
    color: '#14b8a6',
    category: 'Education',
    ...makeTemplate('Subject', '#14b8a6', [
      { title: 'Chapter 1', subchildren: ['Key Concepts', 'Summary'] },
      { title: 'Chapter 2', subchildren: ['Key Concepts', 'Summary'] },
      { title: 'Review', subchildren: ['Practice Questions', 'Key Takeaways'] },
    ]),
  },
  {
    name: 'Meeting Notes',
    description: 'Document meeting discussions',
    icon: FiClock,
    color: '#f59e0b',
    category: 'Business',
    ...makeTemplate('Meeting', '#f59e0b', [
      { title: 'Agenda', subchildren: ['Topic 1', 'Topic 2'] },
      { title: 'Discussion', subchildren: ['Points Raised', 'Decisions Made'] },
      { title: 'Action Items', subchildren: ['Task 1 — Owner', 'Task 2 — Owner'] },
    ]),
  },
  {
    name: 'SWOT Analysis',
    description: 'Analyze strengths and opportunities',
    icon: FiTrendingUp,
    color: '#22c55e',
    category: 'Strategy',
    ...makeTemplate('SWOT Analysis', '#22c55e', [
      { title: 'Strengths', subchildren: ['Internal advantage 1', 'Internal advantage 2'] },
      { title: 'Weaknesses', subchildren: ['Internal gap 1', 'Internal gap 2'] },
      { title: 'Opportunities', subchildren: ['Market trend 1', 'Market trend 2'] },
      { title: 'Threats', subchildren: ['External risk 1', 'External risk 2'] },
    ]),
  },
  {
    name: 'Roadmap',
    description: 'Plan your product roadmap',
    icon: FiMap,
    color: '#ef4444',
    category: 'Product',
    ...makeTemplate('Product Roadmap', '#ef4444', [
      { title: 'Phase 1 — MVP', subchildren: ['Core Features', 'Launch'] },
      { title: 'Phase 2 — Growth', subchildren: ['New Features', 'Marketing'] },
      { title: 'Phase 3 — Scale', subchildren: ['Optimization', 'Expansion'] },
    ]),
  },
];

export const Templates = () => {
  const navigate = useNavigate();

  const handleUseTemplate = (template: TemplateDef) => {
    const mapData = {
      id: crypto.randomUUID(),
      name: template.name,
      lastModified: new Date(),
      createdAt: new Date(),
      nodeCount: Object.keys(template.nodes).length,
    };

    const maps = JSON.parse(localStorage.getItem('userMaps') || '[]');
    maps.push(mapData);
    localStorage.setItem('userMaps', JSON.stringify(maps));

    localStorage.setItem(`graph-${mapData.id}`, JSON.stringify({
      nodes: template.nodes,
      rootNodeId: template.rootNodeId,
    }));

    navigate(`/editor/${mapData.id}`);
  };

  return (
    <div style={{ padding: '32px', maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ marginBottom: 36 }}>
        <div
          style={{
            display: 'inline-block',
            padding: '6px 16px',
            borderRadius: 20,
            background: 'rgba(99,102,241,0.12)',
            border: '1px solid rgba(99,102,241,0.2)',
            color: '#6366f1',
            fontSize: 13,
            fontWeight: 500,
            marginBottom: 16,
          }}
        >
          Templates
        </div>
        <h1 style={{ color: '#ffffff', fontSize: 26, fontWeight: 700, marginBottom: 8, letterSpacing: '-0.02em' }}>
          Start with a Template
        </h1>
        <p style={{ color: '#a1a1aa', fontSize: 14 }}>
          Choose a pre-built template to get started quickly
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 20,
        }}
      >
        {templates.map((template, i) => {
          const Icon = template.icon;
          const childCount = template.rootNodeId
            ? Object.values(template.nodes).filter((n) => n.parentId === template.rootNodeId).length
            : 3;
          return (
            <div
              key={template.name}
              className={`fade-in-up-d${(i % 6) + 1}`}
              style={{
                background: '#2a2a4a',
                borderRadius: 14,
                border: '1px solid rgba(255,255,255,0.06)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
              }}
              onClick={() => handleUseTemplate(template)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${template.color}40`;
                e.currentTarget.style.boxShadow = `0 8px 32px ${template.color}15`;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                height: 4,
                background: `linear-gradient(90deg, ${template.color}, ${template.color}80)`,
              }} />
              <div style={{ padding: '20px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: `${template.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: template.color,
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <h3 style={{ margin: 0, color: '#ffffff', fontSize: 16, fontWeight: 600 }}>
                      {template.name}
                    </h3>
                  </div>
                  <span style={{
                    fontSize: 11, fontWeight: 500,
                    padding: '3px 10px', borderRadius: 12,
                    background: `${template.color}15`,
                    color: template.color,
                  }}>
                    {template.category}
                  </span>
                </div>
                <MiniMapPreview color={template.color} childCount={childCount} />
                <p style={{ margin: '0 0 16px', color: '#a1a1aa', fontSize: 13, lineHeight: 1.5 }}>
                  {template.description}
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => { e.stopPropagation(); handleUseTemplate(template); }}
                >
                  Use Template
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Templates;
