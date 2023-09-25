import React, { useState, useEffect } from 'react';
import { Button, Typography, IconButton, Paper } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = 'en-US';

const styles = {
  container: {
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    fontSize: '40px',
  },
  circularButton: {
    backgroundColor: 'gray',
    borderRadius: '50%',
    margin: '5px',
    width: '50px',
    height: '60px',
    transition: 'background-color 0.3s ease',
  },
};

function VoiceSynthesizer({ onVoiceInput }) {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState('');

  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log('continue..');
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log('Stopped Mic on Click');
      };
    }
    mic.onstart = () => {
      console.log('Mics on');
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      setNote(transcript);
      onVoiceInput(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  return (
    <>
      <Button
        onClick={() => setIsListening((prevState) => !prevState)}
        style={{
          ...styles.circularButton,
          backgroundColor: isListening ? 'lightblue' : 'skyblue',
        }}
      >
        {isListening ? (
          <StopIcon color="secondary" style={styles.icon} />
        ) : (
          <MicIcon color="primary" style={styles.icon} />
        )}
      </Button>
      <Typography variant="body1">{note}</Typography>
    </>
  );
}

export default VoiceSynthesizer;
