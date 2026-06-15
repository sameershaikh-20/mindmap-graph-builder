import { useCallback } from 'react';
import { useGraphStore } from '../store/useGraphStore';

export function useAutoLayout() {
  const autoArrange = useGraphStore((s) => s.actions.autoArrange);

  const triggerAutoLayout = useCallback(() => {
    autoArrange();
  }, [autoArrange]);

  return { triggerAutoLayout };
}
