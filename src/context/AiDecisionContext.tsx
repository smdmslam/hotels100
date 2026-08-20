import React, { createContext, useContext, useState, useEffect } from 'react';

interface AiDecisionState {
  activeQuery: string;
  activeMode: 'index' | 'pro';
  hasActiveSearch: boolean;
}

interface AiDecisionContextType {
  state: AiDecisionState;
  isDrawerOpen: boolean;
  openDrawer: (query?: string, mode?: 'index' | 'pro') => void;
  closeDrawer: () => void;
  saveSearchState: (query: string, mode?: 'index' | 'pro') => void;
  clearSearchState: () => void;
}

const STORAGE_KEY = 'dmw_ai_decision_state_v1';

const defaultState: AiDecisionState = {
  activeQuery: '',
  activeMode: 'index',
  hasActiveSearch: false,
};

const AiDecisionContext = createContext<AiDecisionContextType | undefined>(undefined);

export const AiDecisionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AiDecisionState>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.activeQuery) {
          return { ...parsed, hasActiveSearch: true };
        }
      }
    } catch (e) {}
    return defaultState;
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      if (state.hasActiveSearch) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } else {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {}
  }, [state]);

  const saveSearchState = (query: string, mode: 'index' | 'pro' = 'index') => {
    if (!query.trim()) return;
    setState({
      activeQuery: query.trim(),
      activeMode: mode,
      hasActiveSearch: true,
    });
  };

  const openDrawer = (query?: string, mode?: 'index' | 'pro') => {
    if (query) {
      saveSearchState(query, mode || state.activeMode);
    }
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const clearSearchState = () => {
    setState(defaultState);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  };

  return (
    <AiDecisionContext.Provider
      value={{
        state,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        saveSearchState,
        clearSearchState,
      }}
    >
      {children}
    </AiDecisionContext.Provider>
  );
};

export const useAiDecision = () => {
  const context = useContext(AiDecisionContext);
  if (!context) {
    throw new Error('useAiDecision must be used within an AiDecisionProvider');
  }
  return context;
};
