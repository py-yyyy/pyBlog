import { create } from 'zustand';

const navStore = create((set) => ({
    nav: {},
    setNav: (newNav) => set({ nav: newNav })
}));

export default navStore;