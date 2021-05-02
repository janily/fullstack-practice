import React from 'react'
import Item from './Item'


export default function List(props) {
    const { listData,deleteData,submitData } = props;

    return (
        <div className="list">
            {
                listData.map((item) => {
                    const {id,note,date,time} = item
                    return <Item key={id} id={id} note={note} date={date} time={time} deleteData={deleteData} submitData={submitData}/>
                })
            }
        </div>
    )
}
