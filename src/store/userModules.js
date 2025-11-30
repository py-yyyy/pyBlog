import { create } from 'zustand';

const userStore = create((set) => ({
    user: [],
    setUser: (user) => set({ user }),
    getfetchUser: async () => {
        try {
            const res = await fetch('http://localhost:3001/users');
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            set({ user: data });
        } catch (error) {
            console.error('Failed to fetch user:', error);
        }
    },
    registerUser: async (userData) => {
        try {
            const res = await fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            await userStore.getState().getfetchUser();
        } catch (error) {
            console.error('Failed to register user:', error);
        }
    },
    updateUser: async (userData) => {
        try {
            const res = await fetch(`http://localhost:3001/users/${userData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            await userStore.getState().getfetchUser();
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    },
}));

export default userStore;