

const api = {
    async post(url, body) {
        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    },
    async put(url, body) {
        return await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    },
    async put(url, body) {
        return await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    },
    async get(url) {
        return await fetch(url);
    },
    async delete(url) {
        return await fetch(url, {
            method: 'DELETE',
        });
    },
    redirect(to) {
        // forçar page reload
        const a = document.createElement('a');
        a.href = to;
        a.click();
    }
}

export default api;
