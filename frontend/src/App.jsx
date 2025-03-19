import React, {useEffect, useState} from "react";
import axios from "axios";


const API_URL = "http://localhost:5000/api/schedules";


function App () {
  const [schedules, setSchedules] = useState([]);

  const [subject, setSubject] = useState("");
  const [day, setDay] = useState("");
  const [subjectTime, setSubjectTime] = useState("");
  const [room, setRoom] = useState("");




  useEffect(() => {
    axios
    .get(API_URL)
    .then((response) => setSchedules(response.data))
    .catch((error) => console.error("Error fetching items", error));
  }, []);

  
  const addSchedule = () => {
    axios
    .post(API_URL, {subject: subject, day: day, subjectTime: subjectTime, room})
    .then((response) => {
      setSchedules([...schedules, response.data])
        setSubject("");
        setDay("");
        setSubjectTime("");
        setRoom("");
    })
    .catch((error) => console.error("Error adding schedule:", error));
  };


  const updateSchedule = (id, field, value) => {
    
    const updateSchedule = schedules.find(schedule => schedule.id ===id);
    if(!updateSchedule) return;

      const updateData = {
        subject: updateSchedule.subject,
        day: updateSchedule.day,
        subjectTime: updateSchedule.subjectTime,
        room: updateSchedule.room,
        [field]: value
      };

    axios
    .put(`${API_URL}/${id}`, updateData)
    .then((response) => {
      setSchedules(schedules.map((schedule) => (schedule.id === id ? response.data : schedule)));
    })
    .catch((error) => console.error("Error updating schedule:", error));
  };


  const deleteSchedule = (id) => {
    axios
    .delete(`${API_URL}/${id}`)
    .then(() => {
      setSchedules(schedules.filter((schedule) => schedule.id !== id));
    })
    .catch((error) => console.error("Error deleting item:", error));
  }

return(
  <div>
    <h1> Subject Schedule </h1>

    <input type="text" 
    value={subject} 
    onChange={(e) => setSubject(e.target.value)} placeholder="Subject"
    />

    <input type="text" 
    value={day} 
    onChange={(e) => setDay(e.target.value)} placeholder="Day"
    />

    <input type="text" 
    value={subjectTime} 
    onChange={(e) => setSubjectTime(e.target.value)} placeholder="Time"
    />
    
    <input type="text" 
    value={room} 
    onChange={(e) => setRoom(e.target.value)} placeholder="Room"
    />
    
    <button onClick={addSchedule}> Add Schedule </button>

    <ul>
      {schedules.map((schedule) => (
        <li key={schedule.id}>
            <input type="text" 
            value={schedule.subject}
            onChange={(e) => updateSchedule(schedule.id, "subject", e.target.value)}
            />  

            <input type="text" 
            value={schedule.day} 
            onChange={(e) => updateSchedule(schedule.id, "day", e.target.value)}
            />

            <input type="text" 
            value={schedule.subjectTime} 
            onChange={(e) => updateSchedule(schedule.id, "subjectTime", e.target.value)}
            />

            <input type="text" 
            value={schedule.room} 
            onChange={(e) => updateSchedule(schedule.id, "room", e.target.value)}
            />

            <button onClick={() => deleteSchedule(schedule.id)}> Delete </button>      
        </li>
      ))}
    </ul>
  </div>
);
}



export default App;