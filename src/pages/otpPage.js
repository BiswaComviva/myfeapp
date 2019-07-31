import React, { Component } from "react";
import "../statics/OTPPage.css";
import ApiLayer from '../apiRequest/apiLayer';

const CODE_LENGTH = new Array(6).fill(0);

class otppage extends Component {
  input = React.createRef();
  state = {
    value: "",
    showTrials: false,
    focused: false,
  };
  handleClick = () => {
    this.input.current.focus();
  };
  handleFocus = () => {
    this.setState({ focused: true });
  };
  handleBlur = () => {
    this.setState({
      focused: false,
    });
  };
  handleKeyUp = e => {
    if (e.key === "Backspace") {
      this.setState(state => {
        return {
          value: state.value.slice(0, state.value.length - 1),
        };
      });
    }
  };
  onSubmit=(e)=>{
    e.preventDefault();
      const userData = localStorage.getItem('userToken');
       ApiLayer.validateOtp(JSON.parse(userData).userid , this.state.value).then((response) => {
        
        if(response.code === 6){
            localStorage.setItem('userLoggedIn' , true);
            this.props.history.push("/profile");
        } else {
            var trials = localStorage.getItem('trials');
            trials = trials -1;
            localStorage.setItem('trials' , trials);
            
            this.setState({showTrials:true});
            setTimeout(() => {
                this.setState({
                    showTrials:false
                });
              }, 1000);

            //this.props.history.push("/login");      
        }
    })
  }
  handleChange = e => {
    const value = e.target.value;

    this.setState(state => {
      if (state.value.length >= CODE_LENGTH.length) return null;
      return {
        value: (state.value + value).slice(0, CODE_LENGTH.length),
      };
    });
  };
  render() {
    const { value, focused } = this.state;

    const values = value.split("");
    
    const selectedIndex =
      values.length < CODE_LENGTH.length ? values.length : CODE_LENGTH.length - 1;

    const hideInput = !(values.length < CODE_LENGTH.length);

    return (
      <div>
        <h3>Please enter one time password</h3>
        <form onSubmit={this.onSubmit}>
        <div className="wrap" onClick={this.handleClick}>
          <input
            value=""
            ref={this.input}
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            className="input"
            style={{
              width: "32px",
              top: "0px",
              bottom: "0px",
              left: `${selectedIndex * 32}px`,
              opacity: hideInput ? 0 : 1,
            }}
          />
          {CODE_LENGTH.map((v, index) => {
            const selected = values.length === index;
            const filled = values.length === CODE_LENGTH.length && index === CODE_LENGTH.length - 1;

            return (
              <div className="display">
                {values[index]}
                {(selected || filled) && focused && <div className="shadows" />}
              </div>
            );
          })}
          <button type="submit"  className="btn btn-primary btn-lg" >Verify</button>
        </div>
        </form>
        
        <div className={`alert alert-success ${this.state.showTrials ? 'alert-shown' : 'alert-hidden'}`}>
        <strong> Invalid OTP </strong>
         You have <strong>{localStorage.getItem('trials')}</strong> left !!! 
        </div>
      </div>
    );
  }
}

export default otppage;