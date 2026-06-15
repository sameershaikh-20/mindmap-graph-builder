import { Card } from '../../components/UI/Card';

export const About = () => {
  return (
    <div style={{ padding: '80px 24px', maxWidth: 700, margin: '0 auto' }}>
      <h1 style={{ color: '#ffffff', fontSize: 32, fontWeight: 600, marginBottom: 16, textAlign: 'center' }}>
        About MindMap
      </h1>
      <p style={{ color: '#a1a1aa', fontSize: 16, textAlign: 'center', marginBottom: 48, lineHeight: 1.6 }}>
        A powerful, intuitive mind mapping tool built with modern web technologies.
        Create, organize, and visualize your ideas on an infinite canvas.
      </p>

      <Card padding={24} style={{ marginBottom: 16 }}>
        <h3 style={{ color: '#ffffff', fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Our Mission</h3>
        <p style={{ color: '#a1a1aa', fontSize: 14, lineHeight: 1.6 }}>
          We believe in the power of visual thinking. Our goal is to provide everyone with
          a beautiful, fast, and intuitive tool for organizing their thoughts and ideas.
        </p>
      </Card>

      <Card padding={24}>
        <h3 style={{ color: '#ffffff', fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Technology</h3>
        <p style={{ color: '#a1a1aa', fontSize: 14, lineHeight: 1.6 }}>
          Built with React, TypeScript, Vite, and Zustand. Features an infinite canvas with
          smooth pan/zoom, bezier curve rendering, and local-first data persistence.
        </p>
      </Card>
    </div>
  );
};

export default About;
