import {useEffect, useState} from "react";

export function useFetch(url){
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true);
        fetch(url)
            .then(response => response.json())
            .then(data => setData(data))
            .catch((e) => setError(e))
            .finally(() => setLoading(false))
    }, [url])

    return {loading, data, error}
}