import { create } from 'zustand';

const serachTextStore = create((set) => ({
    serachText: '',
    setSerachText: (newSerachText) => set({ serachText: newSerachText })
}));

export default serachTextStore;
