import React from 'react'
import { PlusSquare, X } from 'react-feather'
import { XSquare } from 'react-feather'

const AudioCard = (props) => {
    return (
        <div className='flex text-white p-2 timer-font justify-center items-center'>


            <div className='px-2'>
                <img src={props.imgSrc} alt="Song Image" className='flex justify-center items-center h-10 w-10' />
            </div>

            <p className='flex justify-center items-center px-2 w-1/5 lg:text-base text-sm '>
                {props.creator}
            </p>

            <p className='flex justify-center items-center px-2 lg:text-base text-sm'>
                {props.duration}
            </p>

            {props.onAddSong && (
                <button className='flex justify-center items-center px-2' onClick={props.onAddSong}>
                    <PlusSquare />
                </button>
            )}

            {props.removeSong && (
                <button className='flex justify-center items-center px-2 text-lg' onClick={props.removeSong}>
                    <XSquare />
                </button>
            )}

        </div>
    )
}

export default AudioCard
