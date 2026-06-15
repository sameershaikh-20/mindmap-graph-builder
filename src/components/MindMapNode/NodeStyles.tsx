import React from 'react';

export const NodeStyles = React.memo(function NodeStyles() {
  return (
    <style>{`
      @keyframes slideIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes nodeAppear {
        from { opacity: 0; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1); }
      }
      @keyframes nodeDisappear {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.8); }
      }
      @keyframes edgeDraw {
        from { stroke-dashoffset: 1000; }
        to { stroke-dashoffset: 0; }
      }
      @keyframes toastSlideIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes toastSlideOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(20px); }
      }
      * { box-sizing: border-box; }
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: #1a1a2e; }
      ::-webkit-scrollbar-thumb { background: #2a2a4a; border-radius: 3px; }
      .node-enter { animation: nodeAppear 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
      .node-exit { animation: nodeDisappear 0.15s ease-in both; }
      .toast-enter { animation: toastSlideIn 0.25s ease-out both; }
      .toast-exit { animation: toastSlideOut 0.2s ease-in both; }
    `}</style>
  );
});
