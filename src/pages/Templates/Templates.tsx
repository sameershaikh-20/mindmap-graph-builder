import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/UI/Card';
import { Button } from '../../components/UI/Button';
import { FiBriefcase, FiStar, FiBook, FiClock, FiTrendingUp, FiMap } from 'react-icons/fi';
import type { Node } from '../../types';

interface TemplateDef {
  name: string;
  description: string;
  icon: typeof FiBriefcase;
  color: string;
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

const templates: TemplateDef[] = [
  {
    name: 'Project Plan',
    description: 'Organize project tasks and milestones',
    icon: FiBriefcase,
    color: '#6366f1',
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
      <h1 style={{ color: '#ffffff', fontSize: 24, fontWeight: 600, marginBottom: 8 }}>
        Templates
      </h1>
      <p style={{ color: '#a1a1aa', fontSize: 14, marginBottom: 32 }}>
        Start faster with pre-built templates
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 16,
        }}
      >
        {templates.map((template) => {
          const Icon = template.icon;
          return (
            <Card
              key={template.name}
              hover
              padding={0}
              style={{ overflow: 'hidden', cursor: 'pointer' }}
              onClick={() => handleUseTemplate(template)}
            >
              <div
                style={{
                  height: 4,
                  background: template.color,
                }}
              />
              <div style={{ padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: `${template.color}18`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: template.color,
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <h3 style={{ margin: 0, color: '#ffffff', fontSize: 15, fontWeight: 600 }}>
                    {template.name}
                  </h3>
                </div>
                <p style={{ margin: '0 0 14px', color: '#a1a1aa', fontSize: 13, lineHeight: 1.5 }}>
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
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Templates;
