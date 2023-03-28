import React from "react";

class SetTimer extends React.Component{
    constructor(props){
      super(props)
    }
    render(){
        return(
            <div id="setting-container">
                <div id="setSession">
                    <h1>Session Length</h1>
                    <h2 id="setting">
                        <button className="arrow arrow-left" onClick={this.props.decreaseSession}></button>
                        <div id="setNum">
                            {this.props.mainState.session}
                        </div>
                        <button className="arrow arrow-right" onClick={this.props.increaseSession}></button>    
                    </h2>
                </div>
                <div id="setBreak">
                    <h1>Break Length</h1>
                    <h2 id="setting">
                        <button className="arrow arrow-left" onClick={this.props.decreaseBreak}></button>
                        <div id="setNum">
                            {this.props.mainState.break}
                        </div>
                        <button className="arrow arrow-right" onClick={this.props.increaseBreak}></button>
                    </h2>
                </div>  
            </div>
        )
    }
}
export default SetTimer;