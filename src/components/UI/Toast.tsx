import { useGraphStore } from '../../store/useGraphStore';
import { selectToasts } from '../../store/selectors';

export function ToastContainer() {
  const toasts = useGraphStore(selectToasts);

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)',
        zIndex: 2000, display: 'flex', flexDirection: 'column', gap: 8,
      }}
      role="alert"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div key={toast.id} style={{
          padding: '10px 20px', borderRadius: 8, fontSize: 13, fontWeight: 500,
          background: toast.type === 'error' ? '#ef4444' : toast.type === 'success' ? '#22c55e' : '#6366f1',
          color: '#fff', boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          animation: 'slideIn 0.3s ease-out',
        }}>
          {toast.message}
        </div>
      ))}
    </div>
  );
}
