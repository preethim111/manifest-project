import React, { useState, useRef } from 'react';

const AudioRecorder = ({ onTranscriptionReceived }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const recognitionRef = useRef(null);

  const startRecording = () => {
    try {
      // Check if browser supports speech recognition
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        throw new Error('Speech recognition is not supported in this browser');
      }

      // Create speech recognition instance
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      // Configure recognition
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      let finalTranscript = '';
      
      recognition.onresult = (event) => {
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }
        
        // Update the transcription in real-time
        if (finalTranscript) {
          onTranscriptionReceived(finalTranscript.trim());
        }
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setErrorMessage(`Speech recognition error: ${event.error}`);
        setIsRecording(false);
      };
      
      recognition.onend = () => {
        setIsRecording(false);
      };
      
      // Start recognition
      recognition.start();
      recognitionRef.current = recognition;
      setIsRecording(true);
      setErrorMessage('');
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setErrorMessage(error.message || 'Error starting speech recognition');
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="audio-recorder">
      <div className="recording-controls">
        {!isRecording ? (
          <button 
            onClick={startRecording}
            className="record-button"
            disabled={isProcessing}
          >
            Start Recording
          </button>
        ) : (
          <button 
            onClick={stopRecording}
            className="stop-button"
            disabled={isProcessing}
          >
            Stop Recording
          </button>
        )}
      </div>

      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}

      <div className="instructions">
        <p>Click "Start Recording" and speak your prompt. The text will appear in the prompt field below.</p>
      </div>

      <style jsx>{`
        .audio-recorder {
          margin: 20px 0;
          padding: 20px;
          border-radius: 8px;
          background-color: #f5f5f5;
        }

        .recording-controls {
          margin-bottom: 15px;
        }

        button {
          padding: 10px 20px;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.3s ease;
        }

        .record-button {
          background-color: #4CAF50;
          color: white;
        }

        .stop-button {
          background-color: #f44336;
          color: white;
        }

        button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }

        .error-message {
          color: #f44336;
          margin: 10px 0;
          padding: 10px;
          background-color: #ffebee;
          border-radius: 4px;
          font-size: 14px;
        }

        .instructions {
          margin-top: 15px;
          font-size: 14px;
          color: #666;
        }
      `}</style>
    </div>
  );
};

export default AudioRecorder; 