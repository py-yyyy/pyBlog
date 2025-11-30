import { create } from 'zustand';

const tagStore = create((set) => ({
    tags: [],
    setTags: (tags) => set({ tags }),
    getfetchTag: async () => {
        try {
            const res = await fetch('http://localhost:3003/tags');
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            set({ tags: data });
        } catch (error) {
            console.error('Failed to fetch tag:', error);
        }
    },
}))

export default tagStore;