import { create } from 'zustand';

const visitorStore = create((set) => ({
    visitor: '',
    setVisitor: (visitor) => set({ visitor })
}));
export default visitorStore;