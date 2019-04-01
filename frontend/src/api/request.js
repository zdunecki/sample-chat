export const API_URL = process.env.API_URL || "http://localhost:5500";

const parseResponse = async response => {
    const json = await response.json();

    if (response.status >= 400 && response.status < 500) {
        throw json
    }
    return json
};

export const request = {
    GET: async (resource, options) => {
        try {
            const response = await fetch(`${API_URL}${resource}`, Object.assign({}, options, {
                method: "GET"
            }));
            return await parseResponse(response);
        } catch (e) {
            throw e
        }
    },
    POST: async (resource, body, options) => {
        try {
            const response = await fetch(`${API_URL}${resource}`, Object.assign({}, options, {
                method: "POST",
                body: JSON.stringify(body)
            }));
            return await parseResponse(response);
        } catch (e) {
            throw e
        }
    },
    UPDATE: async (resource, body, options) => {
        try {
            const response = await fetch(`${API_URL}${resource}`, Object.assign({}, options, {
                method: "UPDATE",
                body: JSON.stringify(body)
            }));
            return await parseResponse(response);
        } catch (e) {
            throw e
        }
    },
    DELETE: async (resource, options) => {
        try {
            const response = await fetch(`${API_URL}${resource}`, Object.assign({}, options, {
                method: "DELETE"
            }));
            return await parseResponse(response);
        } catch (e) {
            throw e
        }
    }
};


