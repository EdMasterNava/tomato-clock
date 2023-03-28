import React from "react";

class Timer extends React.Component{
    constructor(props){
      super(props)
    }
    render(){
        return(
            <div>
                <div id="timer-container">
                    <h1>
                        {this.props.mainState.sessionStateName} 
                    </h1>
                    <div id="time-div">
                        <h1>
                            {   this.props.mainState.min < 1 &&
                                this.props.mainState.min !== null &&
                                this.props.mainState.sec % 2 === 1 
                                    ?   <h1 style={{color: "red"}}>
                                            {this.props.mainState.timer}
                                        </h1> 
                                    :   <h1>
                                            {this.props.mainState.timer}
                                        </h1>
                            }
                        </h1>
                        
                        <div id="timer-buttons">
                            {   !this.props.mainState.running 
                                    ?   <button id="start-stop" onClick={this.props.toggleTimer}>
                                            Start
                                        </button> 
                                    :   <button id="start-stop" onClick={this.props.toggleTimer}>
                                            Stop
                                        </button>
                            }
                            <button id="reset" onClick={this.props.handleReset}>
                                Reset
                            </button>
                        </div>
                    </div>
                    <div id="tracker">
                        <div id="tracker-progress" style={{width: this.props.mainState.percent}}></div>
                    </div>
                    
                </div>
            </div>
        )
    }
}
export default Timer;