import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Page } from '../../schema';

interface Release {
  version: string;
  slug: string;
  timestamp: string;
  snapshot: Page;
  changelog: string;
}

interface PublishState {
  isPublishing: boolean;
  currentVersion: string;
  lastRelease: Release | null;
  history: Release[];
}

const initialState: PublishState = {
  isPublishing: false,
  currentVersion: '0.0.0',
  lastRelease: null,
  history: [],
};

const publishSlice = createSlice({
  name: 'publish',
  initialState,
  reducers: {
    startPublishing: (state) => {
      state.isPublishing = true;
    },
    finishPublishing: (state, action: PayloadAction<Release>) => {
      state.isPublishing = false;
      state.currentVersion = action.payload.version;
      state.lastRelease = action.payload;
      state.history.unshift(action.payload);
    },
    failPublishing: (state) => {
      state.isPublishing = false;
    },
  },
});

export const { startPublishing, finishPublishing, failPublishing } = publishSlice.actions;
export default publishSlice.reducer;
