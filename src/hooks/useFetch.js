import { useState, useEffect } from 'react'
import axios from 'axios'

export const useFetch = (url, method = 'GET') => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [option, setOption] = useState(null)

  const postData = (postData) => {
    setOption({
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    })
  }

  useEffect(() => {

    const fetchData = async () => {
      setIsPending(true)
      try {
        const res = await axios.get(url)
        console.log(res)
        const data = res.data
        window.setTimeout(() => {
          setIsPending(false)
        }, 1000)
        setError(null)
        setData(data)

      } catch(err) {
        if(err.name === 'AbortError') {
          console.log("the fetch was aborted")
        } else {
          setIsPending(false)
          setError('Could not fetch the data')
        }
      }

    }

    if(method === 'GET') {
      fetchData()
    }
    // clear function
    return () => {
      
    }
  }, [url, method, option])
  
  return { data, isPending, error, postData }
}