import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Page, Section } from '../../schema';

interface DraftPageState {
  page: Page | null;
  originalPage: Page | null;
  hasUnsavedChanges: boolean;
}

const initialState: DraftPageState = {
  page: null,
  originalPage: null,
  hasUnsavedChanges: false,
};

const draftPageSlice = createSlice({
  name: 'draftPage',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<Page>) => {
      state.page = action.payload;
      state.originalPage = action.payload;
      state.hasUnsavedChanges = false;
    },
    updateSectionProps: (state, action: PayloadAction<{ sectionId: string; props: Record<string, unknown> }>) => {
      if (!state.page) return;
      const section = state.page.sections.find(s => s.id === action.payload.sectionId);
      if (section) {
        section.props = { ...section.props, ...action.payload.props };
        state.hasUnsavedChanges = true;
      }
    },
    reorderSections: (state, action: PayloadAction<Section[]>) => {
      if (!state.page) return;
      state.page.sections = action.payload;
      state.hasUnsavedChanges = true;
    },
    addSection: (state, action: PayloadAction<Section>) => {
      if (!state.page) return;
      state.page.sections.push(action.payload);
      state.hasUnsavedChanges = true;
    },
    removeSection: (state, action: PayloadAction<string>) => {
      if (!state.page) return;
      state.page.sections = state.page.sections.filter(s => s.id !== action.payload);
      state.hasUnsavedChanges = true;
    },
    savePage: (state) => {
      state.originalPage = state.page;
      state.hasUnsavedChanges = false;
    },
  },
});

export const { setPage, updateSectionProps, reorderSections, addSection, removeSection, savePage } = draftPageSlice.actions;
export default draftPageSlice.reducer;
