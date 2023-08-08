// features/appSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AppState {
    SelfDescription: string;
    JobDescription: string;
    AddtionalInfo: string;
    CoverLetter: string;
}

const initialState: AppState = {
    SelfDescription: '',
    JobDescription: '',
    AddtionalInfo: '',
    CoverLetter: '',
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setSelfDescription: (state, action: PayloadAction<string>) => {
            state.CoverLetter = action.payload;
        },
        setJobDescription: (state, action: PayloadAction<string>) => {
            state.CoverLetter = action.payload;
        },
        setAdditionalInfo: (state, action: PayloadAction<string>) => {
            state.CoverLetter = action.payload;
        },
        setCoverLetter: (state, action: PayloadAction<string>) => {
            state.CoverLetter = action.payload;
        },
    },
});

export const { 
    setSelfDescription,
    setJobDescription,
    setAdditionalInfo,
    setCoverLetter 
} = appSlice.actions;
export default appSlice.reducer;
