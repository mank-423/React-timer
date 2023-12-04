import React, { useEffect, useState } from 'react';
import { TimeContext, useTime } from '../context';
import { useNavigate } from 'react-router-dom';
import useSound from 'use-sound';
import interstellar from '../assets/audio/Interstellar.mp3';
import tomday from '../assets/audio/TomDay.mp3'
import AudioCard from './AudioCard';

const Screen2 = () => {

  // Map for audio files
  const audioMap = {
    Interstellar: interstellar,
    TomDay: tomday,
  };


  const { hour, min, audio, deleteAudio } = useTime(TimeContext);
  const [hr, setHr] = useState(hour);
  const [mn, setMn] = useState(min);
  const [ipAudio, setIpAudio] = useState(audio);
  const totalTime = hr * 3600 + mn * 60;
  const [remainingTime, setRemainingTime] = useState(totalTime);
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [currentVolume, setCurrentVolume] = useState(0.5);
  const [play, { stop, volume }] = useSound(audioMap[ipAudio?.creator] || interstellar, { volume: currentVolume });

  const navigate = useNavigate();

  const apiCall = async () => {
    const response = await fetch("https://api.quotable.io/quotes/random?tags='success' & maxLength=100");
    const data = await response.json();
    setQuote(data[0].content);
    setAuthor(data[0].author);
  };

  const updateTime = () => {
    if (remainingTime > 0) {
      setRemainingTime(remainingTime - 1);
    }
  };

  useEffect(() => {
    if (remainingTime === 0) {
      stop();
      deleteAudio();
      navigate('/');
      return;
    }

    if (remainingTime < 10 && remainingTime > 0) {
      setCurrentVolume((prevVolume) => Math.max(0, prevVolume - 0.05));
    }

    const timer = setInterval(updateTime, 1000);

    // Cleanup function
    return () => {
      clearInterval(timer);
    };
  }, [remainingTime, stop, navigate]);

  useEffect(() => {
    apiCall();

    // Playing audio based on ipAudio.creator
    if (ipAudio) {
      play();
    }

    // Cleanup function
    return () => {
      stop();
    };
  }, [ipAudio, play, stop]);

  useEffect(() => {
    play.volume = currentVolume;
  }, [play, currentVolume]);

  // Format and display the remaining time
  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;

  // Formatted text
  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div className="text-white">
      <div className="py-40 md:py-72 lg:p-56 landscape:p-32">
        <p className="flex justify-center place-items-center text-7xl md:text-8xl lg:text-9xl timer-font">
          {formattedTime}
        </p>
      </div>

      {ipAudio && (
        <div className='pb-2 sm:pb-6'>
          <AudioCard
            imgSrc={ipAudio.imgSrc}
            creator={ipAudio.creator}
            duration={ipAudio.duration}
          />
        </div>
      )}

      <div className='timer-font px-20 landscape:mb-10 pb-10'>
        <p className='flex items-center justify-center sm:text-sm lg:text-lg'>{quote}</p>
        <p className='flex items-center justify-center sm:text-sm lg:text-lg'>-{author}</p>
      </div>
    </div>
  );
};

export default Screen2;

