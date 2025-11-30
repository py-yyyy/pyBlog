import { create } from 'zustand';

const articleStore = create((set) => ({
    articles: [],
    setArticles: (articles) => set({ articles }),
    getfetchArticle: async () => {
        try {
            const res = await fetch('http://localhost:3002/articles');
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            set({ articles: data });
        } catch (error) {
            console.error('Failed to fetch article:', error);
        }
    }, 
    addArticle: async (articleData) => {
        try {
            const res = await fetch('http://localhost:3002/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(articleData),
            });
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            await articleStore.getState().getfetchArticle();
        } catch (error) {
            console.error('Failed to add article:', error);
        }
    },
    removeArticle: async (articleId) => {
        try {
            const res = await fetch(`http://localhost:3002/articles/${articleId}`, {
                method: 'DELETE',
            });
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            await articleStore.getState().getfetchArticle();
        } catch (error) {
            console.error('Failed to remove article:', error);
        }
    },
    updateArticle: async (articleData) => {
        try {
            const res = await fetch(`http://localhost:3002/articles/${articleData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(articleData),
            });
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            await articleStore.getState().getfetchArticle();
        } catch (error) {
            console.error('Failed to update article:', error);
        }
    },
}))

export default articleStore;
