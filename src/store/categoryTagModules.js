import { create } from 'zustand';

const categoryTagStore = create((set) => ({
    category: '',
    setCategory: (category) => set({ category }),
}))
export default categoryTagStore;