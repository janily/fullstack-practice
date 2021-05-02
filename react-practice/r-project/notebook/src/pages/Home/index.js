import React, { useState, useEffect, useRef } from 'react'
import { API_GET_DATA } from '../../global/constants'
import Edit from './components/Edit'
import List from './components/List'
import './index.css'

async function fetchData(setData) {
    const res = await fetch(API_GET_DATA)
    console.log("res",res);
    const {data} = await res.json()
    console.log('data',data);
    setData(data)
}

async function fetchSetData(data) {
    await fetch(API_GET_DATA, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ data })
    })
}

export default function Home() {
    const [data,setData] = useState([ ])
    const submitData = useRef(false);

    // useEffect(() => {
    //     // 绑定的事情
    //     //window.alert("新增成功")
    //     return () => {
    //         // 取消绑定的事情
    //     }
    // },[data])

    useEffect(()=>{
        fetchData(setData)
        // console.log("data",data);
    }, [])

    useEffect(() => {
        if(!submitData.current) {
            return
        }
        fetchSetData(data).then(data => submitData.current = false)
    },[data])
    return (
        <div className="app">
            <Edit add={setData} submitData={submitData} />
            <List listData={data} deleteData={setData} submitData={submitData} />
        </div>
    )
}
