import { createSlice } from '@reduxjs/toolkit'

export const nftSlice = createSlice({
  name: 'nft',
  initialState: {
    remainingNFT: 5000,
    totalNFT:5000
  },
  reducers: {
    setRemaining: (state, action) => {
      state.remainingNFT = action.payload;
    },
  },
})

export const { setLoading } = nftSlice.actions;

export const remainingNFT = (state) => state.nft.remainingNFT;
export const totalNFT = (state) => state.nft.totalNFT;

export default nftSlice.reducer;
