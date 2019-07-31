import React ,  {Component} from 'react';
//import jwt_decode from 'jwt-decode';
//import ReactCountdownClock from 'react-countdown-clock';

class Profile extends Component {
    constructor(){
        super()
            this.state =  {
                userid:'',
                msisdn:''
            }
        }

        componentDidMount() { 
            const userData = localStorage.getItem('userToken');
            const userLoggedIn = localStorage.getItem('userLoggedIn');
            if(userData && userLoggedIn) { 
            this.setState({
                userid: JSON.parse(userData).userid
            })
        } else  {
            this.props.history.push('/');
        }
    }
        

        render () {
            return (
                <div className="container">
                    <div className="jumbotron mt-4">
                        <h1 className="text-center">Profile</h1>
                        <h1 className="text-center">{this.state.userid}</h1>
                        <h1 className="text-center">{this.state.msisdn}</h1>
                    </div>
                </div>
            )
        }
    }

    export default Profile;