import { Storage } from 'redux-persist';
import { MMKVLoader } from 'react-native-mmkv-storage';

const storage = new MMKVLoader().initialize();

export const reduxStorageMMKV: Storage = {
  setItem: (key, value) => {
    storage.setString(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.removeItem(key);
    return Promise.resolve();
  },
};
