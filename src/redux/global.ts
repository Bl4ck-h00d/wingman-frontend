import { createSlice } from "@reduxjs/toolkit";
import { GlobalFeaturesInterface } from "../Interfaces/FeaturesInterface";

interface initialStateInterface {
  globalLoading: boolean;
  selectedSession?: string;
  selectedUser?: string;
  shareModalVisible?: boolean;
  globalFeatures?: GlobalFeaturesInterface;
  showMissedCallsOnly?: boolean;
  showConsoleLog?: boolean;
  filterValues?: any;
  savedFilters?: any;
}

const initialState: initialStateInterface = {
  globalLoading: false,
  selectedSession: undefined,
  selectedUser: undefined,
  shareModalVisible: false,
  globalFeatures: {
    showSignup: false,
    showDomainName: false,
    showBillingPage: false,
    showIntegrationPage: false,
    showCommentTab: false,
    showCommentButton: false,
  },
  showMissedCallsOnly: false,
  showConsoleLog: false,
  filterValues: {},
  savedFilters:{},
};
const globalModal = createSlice({
  name: "global_modal",
  initialState,
  reducers: {
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload;
    },
    setGlobalFeatures: (state, action) => {
      state.globalFeatures = action.payload;
    },
    setSelectedSession: (state, action) => {
      state.selectedSession = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setShareModalVisibility: (state, action) => {
      state.shareModalVisible = action.payload;
    },
    setShowMissedCallsOnly: (state, action) => {
      state.showMissedCallsOnly = action.payload;
    },
    setShowConsoleLog: (state, action) => {
      state.showConsoleLog = action.payload;
    },
    setFilterValues: (state, action) => {
      state.filterValues = action.payload;
    },
    setSavedFilters: (state, action) => {
      state.savedFilters = action.payload;
    }
  },
});

export default globalModal.reducer;
export const {
  setGlobalLoading,
  setSelectedSession,
  setSelectedUser,
  setShareModalVisibility,
  setGlobalFeatures,
  setShowMissedCallsOnly,
  setShowConsoleLog,
  setFilterValues,
  setSavedFilters
} = globalModal.actions;
