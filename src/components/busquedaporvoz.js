import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = ({onfiltrar1}) => {
  const [busquedavoz, setBusquedavoz] = useState("");
  const [transcript, setTranscript] = useState("");

  const handleTranscriptChange = (e) => {
    const value = e.target.value;
    setBusquedavoz(value);
    onfiltrar1(value)
    
  };

  const {
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    interimTranscript, //esta es una variable
  } = useSpeechRecognition();

  useEffect(() => {
    if (interimTranscript) {
      setTranscript(interimTranscript);
      setBusquedavoz(interimTranscript);
      onfiltrar1(interimTranscript)
    }
  }, [interimTranscript,onfiltrar1]);
  
  console.log(transcript);
  console.log(busquedavoz)

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <input className='input' value={transcript} name='transcript' onChange={handleTranscriptChange} />
    </div>
  );
};

export default Dictaphone;
