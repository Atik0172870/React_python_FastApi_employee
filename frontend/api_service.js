const BASE_URL = "http://localhost:8000";
async function apiFetch(endpoint, options = {}) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        },
        ...options
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(`Error: ${response.status} - ${message}`);
    }
    
    return response.json();
}

export const addEmployee = async (data) => {
    const options = {
        method: "POST",
        body: JSON.stringify(data)
    }
    return await apiFetch("/employee", options)
}

export const getEmployee = async () => {
    const options = { method: 'GET' }
   return await apiFetch("/employees", options);
}

export const updateEmployee = (data) =>
    apiFetch(`/edit_employee`, {
        method: "PUT",
        body: JSON.stringify(data)
    })

export const deleteEmployee = (id) =>
    apiFetch(`/delete_employee/${id}`, {
        method: "DELETE"
    });

