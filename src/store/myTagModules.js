import { create } from 'zustand';

const myTagStore = create((set) => ({
    myTag: -1,
    setMyTag: (myTag) => set({ myTag }),
}))
export default myTagStore;