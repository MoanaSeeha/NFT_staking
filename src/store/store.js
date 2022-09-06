import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './accountReducer';
import loadingReducer from './loadingReducer';
import nftReducer from './nftReducer';

export default configureStore({
  reducer: {
    account: accountReducer,
    nft: nftReducer,
    loading: loadingReducer
  },
});
