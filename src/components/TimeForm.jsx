import React, { useContext, useState } from 'react';
import { TimeContext, useTime } from '../context';
import { useNavigate } from 'react-router-dom';
import audioData from '../utils/AudioData';
import AudioCard from './AudioCard';
import { useSnackbar } from 'notistack';


const TimeForm = () => {
  // Getting variables from timeContext
  const { hour, min, audio, addHour, addMin, addAudio, deleteAudio } = useTime();

  const [ipHour, setIpHour] = useState(0); //Setting hour temporarily
  const [ipMin, setIpMin] = useState(0);  //Setting minute temporarily
  const [ipAudio, setIpAudio] = useState(null); //Setting audio temporarily

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate(); //Redirection after input

  //Form handling
  const handleSubmit = (e) => {
    e.preventDefault();

    // Flag to check if validation fails
    let validationFailed = false;

    // Check if not 0, validation
    if (ipHour == 0 && ipMin == 0) {
      showErrMsg("Enter values first");
      validationFailed = true;
    }

    // If validation fails, do not proceed with form submission
    if (validationFailed) {
      return;
    }

    //Add to global state of context API
    addHour(ipHour);
    addMin(ipMin);
    // console.log("Global state for hour and min ", hour, " ", min);
    
    navigate("/timer"); //Navigate to timer page
  };

  // Notistack function
  const showErrMsg = (msg) => {
    enqueueSnackbar(msg, { variant: 'error' });
  };

  //Adding song from the queue
  const addAudioToGlobalState = (song) => {
    //If audio exists then first remove then add
    if (ipAudio) {
      showErrMsg("First remove the selected song");
    }
    //Otherwise add the audio
    setIpAudio(song);
    addAudio(song);
  };


  //Remove the audio
  const removeAudioFromGlobalState = () => {
    setIpAudio(null);
    deleteAudio();
  }

  return (
    <div>

      <form>

        <div className='flex justify-center items-center pt-32 landscape:pt-20'>


          {/* Input of hour */}
          <input
            type="text"
            placeholder={ipHour === 0 ? '00' : ''}
            onChange={(e) => setIpHour(e.target.value)}
            className='h-44 w-44 rounded-3xl text-9xl timer-font text-center'
          />

          <div className='text-white text-7xl pb-4 font-bold'>:</div>


          {/* input of minute */}
          <input
            type="text"
            placeholder={ipHour === 0 ? '00' : ''}
            onChange={(e) => setIpMin(e.target.value)}
            className='h-44 w-44 rounded-3xl text-9xl timer-font text-center'
          />

        </div>

        <br />

        {/* If audio is selected then show which audio is selected */}
        <div>
          {ipAudio &&
            (
              <AudioCard
                imgSrc={ipAudio.imgSrc}
                creator={ipAudio.creator}
                duration={ipAudio.duration}
                removeSong={removeAudioFromGlobalState}
              />
            )
          }
        </div>

        <div className='flex justify-center items-center'>
          {/* Submit button to start */}
          <input type="submit" onClick={handleSubmit} className='bg-white rounded-3xl p-5 timer-font' value={'START'} />
        </div>
      </form>




      <div className='flex flex-col lg:justify-items-start justify-center'>
        {audioData.map((item) => (
          <AudioCard
            key={item.id}
            imgSrc={item.imgSrc}
            creator={item.creator}
            duration={item.duration}
            onAddSong={() => addAudioToGlobalState(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default TimeForm;
