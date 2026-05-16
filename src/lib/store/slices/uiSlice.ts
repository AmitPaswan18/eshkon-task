import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  selectedSectionId: string | null;
  sidebarOpen: boolean;
  isPreviewMode: boolean;
  role: 'viewer' | 'editor' | 'publisher';
  viewport: 'desktop' | 'mobile';
}

const initialState: UIState = {
  selectedSectionId: null,
  sidebarOpen: true,
  isPreviewMode: false,
  role: 'editor', // Default for dev
  viewport: 'desktop',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    selectSection: (state, action: PayloadAction<string | null>) => {
      state.selectedSectionId = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setPreviewMode: (state, action: PayloadAction<boolean>) => {
      state.isPreviewMode = action.payload;
    },
    setRole: (state, action: PayloadAction<UIState['role']>) => {
      state.role = action.payload;
    },
    setViewport: (state, action: PayloadAction<'desktop' | 'mobile'>) => {
      state.viewport = action.payload;
    },
  },
});

export const { selectSection, toggleSidebar, setPreviewMode, setRole, setViewport } = uiSlice.actions;
export default uiSlice.reducer;
