import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Audio } from 'expo-av';
//import firebase from '../firebase'

export default function HomeScreen() {
  const [recording,setRecording] = React.useState();
  const [recordings,setRecordings] = React.useState([]);
  const [message,setMessage] = React.useState();


  async function startRecording(){
    try{
      const permission = await Audio.requestPermissionsAsync();
      //setRecording(recording);

      if(permission.status==="granted"){
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY //CHECK THE PRESET OPTIONS 
        );
        setRecording(recording);
      } else{
        setMessage("Please grant permission to use microphone")
      }
    }catch{
      console.error('Recording Failed!!', err);
    }
  }

  async function stopRecording(){
    setRecording(undefined);

    await recording.stopAndUnloadAsync();

    let updatedRecordings = [...recordings];
    const {sound, status} = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound:sound,
      duration: getDurationFormatted(status.durationMillis),
      file:recording.getURI()
    });
    setRecordings(updatedRecordings);
   
  }
  
  function getDurationFormatted(millis){
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) =>{
      return(
        <View key={index} style={styles.row}>
           <Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration}</Text>
           <Button style={styles.button} onPress={()=> recordingLine.sound.replayAsync()} title="Play"></Button>
           <Button style={styles.button} onPress={() => Sharing.shareAsync(recordingLine.file)} title="Share"></Button>
        </View>
      );
    });
  }

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <Button title={recording ? 'Stop Recording' : 'Start Recording'}
       onPress={recording ? stopRecording: startRecording}></Button>
      <StatusBar style="auto" />
      <Text>{getRecordingLines()}</Text>
    </View>
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row:{
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'center'
  },
  fill:{
    flex: 1,
    margin: 16
  },
  button:{
    margin: 16
  }

});