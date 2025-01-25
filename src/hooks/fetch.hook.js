import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { getUsername } from '../helper/helper.js'

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;


/** custom hook */
export default function useFetch(query){
    const [getData, setData] = useState({ isLoading : false, apiData: undefined, status: null, serverError: null })

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                
                setData(prev => ({ ...prev, isLoading: true}));

                const { username } = !query ? await getUsername() : '';
                const { data, status } = !query ? await axios.get(`/api/user/${username}`) : await axios.get(`/api/${query}`);
                
                if(status === 201){
                    setData(prev => ({ ...prev, isLoading: false}));
                    setData(prev => ({ ...prev, apiData : data, status: status }));
                }

                setData(prev => ({ ...prev, isLoading: false}));
            } catch (error) {
                setData(prev => ({ ...prev, isLoading: false, serverError: error }))
            }
        };
        fetchData()

    }, [query]);

    return [getData, setData];
}

export function useAsync(func, dependencies = []){
    const { execute, ...state } = useAsyncInternal(func, dependencies, true);

    useEffect(() => {
        execute();
    }, [execute]);

    console.log("state: ", state);

    return state;
}

export function useAsyncFn(func, dependencies = []){
    return useAsyncInternal(func, dependencies, false);
}

function useAsyncInternal(func, dependencies, initialLoading = false){
    const [loading, setLoading] = useState(initialLoading);
    const [error, setError] = useState();
    const [value, setValue] = useState();

    const execute = useCallback((...params) => {
        setLoading(true);
        return func(...params).then(data => {
            setValue(data);
            setError(undefined);
            return data;
        }).catch(error => {
            setValue(undefined);
            setError(error);
            return Promise.reject(error);
        }).finally(() => {
            setLoading(false);
        })
    }, dependencies);

    return { loading, error, value, execute }
}