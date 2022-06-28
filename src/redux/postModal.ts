import { createSlice } from "@reduxjs/toolkit";
import { AppStateType } from "./rootReducer";
import localStorageService from "src/utils/localStorage";

interface initialStateInterface {
    currentPost: {
        postId: Number;
        title: string;
        description: string;
        tags: string[],
        anonymous: boolean;
    };
    editingPost: boolean;
  postUpdatedRedirect: boolean;
}

const initialState: initialStateInterface = {
    currentPost: null,
    editingPost: false,
  postUpdatedRedirect: false,
};

const post_modal = createSlice({
  name: "post_modal",
  initialState,
  reducers: {
    setCurrentPost: (state, action) => {
          state.currentPost = { ...action.payload };
          console.log(action.payload)
    },
    setEditingPost: (state, action) => {
      state.editingPost = action.payload;

      if (!action.payload) {
        state.currentPost = null;
      }
    },
    setPostUpdatedRedirect:(state, action)=> {
      state.postUpdatedRedirect = action.payload;
    }
  },
});

export default post_modal.reducer;
export const { setCurrentPost, setEditingPost, setPostUpdatedRedirect } = post_modal.actions;
