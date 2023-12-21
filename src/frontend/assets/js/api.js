

const api = {
    async post(url, body) {
        const postData = typeof body == 'object' ? JSON.stringify(body) : body;
        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: postData
        });
    },
    async put(url, body) {
        const putData = typeof body == 'object' ? JSON.stringify(body) : body;
        return await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: putData
        });
    },
    async patch(url, body) {
        const patchData = typeof body == 'object' ? JSON.stringify(body) : body;
        return await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: patchData
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
}

export default api;
