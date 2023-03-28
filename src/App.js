import React from 'react';
import SetTimer from './components/SetTimer';
import Timer from './components/Timer';
import './components/css/App.css';

const SESSION = 25;
const BREAK = 5;
const TIMER = '25:00'
//Components
class App extends React.Component{
  constructor(props){
    super(props)
    //main state
    this.state = {
      session: SESSION,
      break: BREAK,
      timer: TIMER,
      running: false,
      interval: null,
      min: null,
      sec: null,
      totalSec: 0,
      sessionState: true,
      sessionStateName: '25 + 5 Clock',
      percent: '',
      percentCounter: 0
    }
    //binds
    this.increaseSession = this.increaseSession.bind(this);
    this.decreaseSession = this.decreaseSession.bind(this);
    this.increaseBreak = this.increaseBreak.bind(this);
    this.decreaseBreak = this.decreaseBreak.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handlePercent = this.handlePercent.bind(this);
    this.handleInterval = this.handleInterval.bind(this);
  }
  //update session and timer up
  increaseSession(){
    if(this.state.min !== null){
      this.setState({running: false, min: null});
      clearInterval(this.state.interval);
    }
    if(this.state.session < Number.MAX_SAFE_INTEGER){
        this.setState(state =>{
     return {session: state.session + 1,
             timer: (state.session + 1) < 10 ? '0' + (state.session + 1) + ':00' : (state.session + 1) + ':00'}});
      }
  }
  //update session and timer down
  decreaseSession(){
    if(this.state.min !== null){
      this.setState({running: false, min: null});
      clearInterval(this.state.interval);
    }
    if(this.state.session > 1){
      this.setState(state => ({session: state.session - 1,
                               timer: (state.session - 1) < 10 ? '0' + (state.session - 1) + ':00' : (state.session - 1) + ':00'}));
    }
    
  }
  //update break up
  increaseBreak(){
    if(this.state.min !== null){
      this.setState({running: false, min: null});
      clearInterval(this.state.interval);
    }
    if(this.state.session < Number.MAX_SAFE_INTEGER){
      this.setState(state => ({break: state.break + 1}));
    }
  }
  //update break down
  decreaseBreak(){
    if(this.state.min !== null){
      this.setState({running: false, min: null});
      clearInterval(this.state.interval);
    }
    if(this.state.break > 1){
      this.setState(state => ({break: state.break - 1}));
    } 
  }
  //start and stop timer
  toggleTimer(){
    this.setTimer();
    if(!this.state.running){
      this.setState({running: true,
                     interval: this.handleInterval()});
   
    } else{
      this.setState({running: false});
      clearInterval(this.state.interval);
    }
  }
  //sets session 
  setTimer(){
    //check for null
    if(this.state.min === null){
      if(this.state.sessionState){
      this.setState(state => {
        return {min: state.session, 
                sec: state.session * 60,
                totalSec: state.session * 60,
                sessionStateName: 'Session',
                percentCounter: 0}
      })
    }else{
      this.setState(state => {
        return {min: state.break, 
                sec: state.break * 60,
                totalSec: state.break * 60,
                sessionStateName: 'Break',
                percentCounter: 0}
      })
                    
    }
   } 
  }
  handlePercent(){
    const percentage = (this.state.percentCounter / this.state.totalSec) * 100;
    this.setState({percent: percentage < 3 ? '3%' : percentage + '%'});
  }
  handleInterval(){
    return setInterval(() => {
              if(this.state.min === 0 &&
                 this.state.sec === 0){
                clearInterval(this.state.interval);
                this.setState(state => ({running: false, sessionState: !state.sessionState,
                                         min: null, percentCounter: 0, percent: ''}));
                this.togglePlay();
                this.toggleTimer();
                return;
              }
              let secR = this.state.sec % 60;
              if((secR) === 0){
                this.setState(state => ({min: state.min - 1}));

              }
              this.setState(state => ({sec: state.sec - 1, 
                                       percentCounter: state.percentCounter + 1}));
              this.handlePercent();
              secR = this.state.sec % 60;
              let minR = this.state.min % 60;
              minR = minR < 10 ? "0" + minR : minR;
              secR = secR < 10 ? "0" + secR : secR;
              this.setState({timer: minR + ':' + secR})
            }, 1000)
  }
  togglePlay() {
    this.audio = new Audio('https://sampleswap.org/samples-ghost/DRUM%20LOOPS%20and%20BREAKS/111%20to%20120%20bpm/369[kb]113_submarine-alarm.wav.mp3');
    this.audio.play();
  }
  //reset App
  handleReset(){
    clearInterval(this.state.interval);
    this.setState({
      session: SESSION,
      break: BREAK,
      timer: TIMER,
      running: false,
      interval: null,
      min: null,
      sec: null,
      sessionState: true,
      sessionStateName: 'Timer',
      percent: '',
      percentCounter: 0
    })
  }
  render(){
    return(
      <div>
        <SetTimer mainState={this.state}
                  increaseSession={this.increaseSession} 
                  decreaseSession={this.decreaseSession} 
                  increaseBreak={this.increaseBreak} 
                  decreaseBreak={this.decreaseBreak}/>
        <Timer mainState={this.state}
               toggleTimer={this.toggleTimer}
               handleReset={this.handleReset}/>
      </div>
    )
  }
}
export default App;