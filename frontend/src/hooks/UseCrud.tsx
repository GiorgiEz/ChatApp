import {useCallback, useState} from 'react';
import {CRUD} from "../utils/Utils";

const useCrud = (endpoint) => {
    const [error, setError] = useState("");

    const fetchData = async (method, data = null) => {
        let success = true
        try {
            const config = {
                method,
                headers: {'Content-Type': 'application/json',},
                body: data ? JSON.stringify(data) : null,
            };
            const response = await fetch(`http://localhost:3000/${endpoint}`, config as RequestInit);
            if (response.ok) {
            } else {
                success = false
                setError(`Failed to ${method} data`);
            }
        } catch (error) {
            success = false
            setError('Internal Server Error: ' + error);
        }
        return {success}
    }

    const create = async (data) => await fetchData(CRUD.CREATE, data);
    const read = useCallback(async () => await fetchData(CRUD.READ), []);
    const update = async (data) => await fetchData(CRUD.UPDATE, data);
    const remove = async () => await fetchData(CRUD.DELETE);

    return { create, read, update, remove, error };
}

export default useCrud;
