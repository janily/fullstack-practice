import React,{useState} from 'react'
import { v4 as uuidv4 } from 'uuid';

export default function Edit(props) {
    const {add, submitData } = props
    const [note, setNote] = useState("")
    function noteChange(e) {
        setNote(e.target.value)
    }

    const [date, setDate] = useState("")
    function dateChange(e) {
        setDate(e.target.value)
    }

    const [time, setTime] = useState("")
    function timeChange(e) {
        setTime(e.target.value)
    }
    function addItem() {
        submitData.current = true
        add(function (prevData) {
            return  [{
                id: uuidv4(),
                note,
                date,
                time
            },...prevData]
        })
    }
    return (
        <div>
            <h1>记事本</h1>
            <p>记事：</p>
            <input type="text" value={note} onChange={noteChange}/>
            <p>日期</p>
            <input type="date" value={date} onChange={dateChange}/>
            <p>时间</p>
            <input type="time" value={time} onChange={timeChange}/>
            <button className="add" onClick={addItem}>新增</button>
        </div>
    )
}
