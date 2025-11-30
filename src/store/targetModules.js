import { create } from 'zustand';

const targetStore = create((set) => ({
    target: {},
    setTarget: (newTarget) => set({ target: newTarget })
}));

export default targetStore;