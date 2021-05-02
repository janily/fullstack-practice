import React from 'react'

export default function Item(props) {
    const {id,note,date,time, deleteData,submitData } = props

    function deleteItem() {
        submitData.current = true
        deleteData(function(prev) {
            return prev.filter(item=> item.id !== id)
        })
    }
    return (
        <div className="item">
            <div id={`#${id}`}>
                <p>{note}</p>
                <p>{`${date} ${time}`}</p>
            </div>
            <button  onClick={deleteItem} className="remove">删除</button>
        </div>
    )
}
