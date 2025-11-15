import { useState, useEffect } from 'react';

const useApi = (apiFunc, immediate = true) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const execute = async (...params) => {
        try {
        setLoading(true);
        setError(null);
        const result = await apiFunc(...params);
        setData(result);
        return result;
        } catch (err) {
        setError(err.response?.data?.error || err.message || 'An error occurred');
        throw err;
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        if (immediate) {
        execute();
        }
    }, []);

    return { data, loading, error, execute };
};

export default useApi;