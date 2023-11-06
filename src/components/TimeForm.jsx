import React, { useContext, useState } from 'react';
import { TimeContext, useTime } from '../context';
import { useNavigate } from 'react-router-dom';

const TimeForm = () => {
  const { hour, min, addHour, addMin } = useTime();

  const [ipHour, setIpHour] = useState(0);
  const [ipMin, setIpMin] = useState(0);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addHour(ipHour);
    addMin(ipMin);

    // console.log(hour, ' ', min);
    navigate("/timer")
  }



  return (
    <div>
      <form>

        <div className='flex justify-center items-center pt-32'>

          <input
            type="text"
            // value={ipHour}
            placeholder={ipHour === 0 ? '00' : ''}
            onChange={(e) => setIpHour(e.target.value)}
            className='h-44 w-44 rounded-3xl text-9xl timer-font text-center'
          />

          <div className='text-white text-7xl pb-4 font-bold'>:</div>

          <input
            type="text"
            // value={ipMin}
            placeholder={ipHour === 0 ? '00' : ''}
            onChange={(e) => setIpMin(e.target.value)}
            className='h-44 w-44 rounded-3xl text-9xl timer-font text-center'
          />

        </div>
        
        <br />

        <div className='flex justify-center items-center'>
          <input type="submit" onClick={handleSubmit} className='bg-white rounded-3xl p-5 timer-font' value={'START'}/>
        </div>
      </form>
    </div>
  );
}

export default TimeForm;
