import React ,  {Component} from 'react';
import jwt_decode from 'jwt-decode';

class Profile extends Component {
    constructor(){
        super()
            this.state =  {
                userid:'',
                msisdn:''
            }
        }

        componentDidMount() { 
            const token = localStorage.userToken
            const decoded = jwt_decode(token);
            console.log(localStorage.userToken);
            console.log(decoded);
            this.setState({
                userid: decoded.userid,
                msisdn: decoded.msisdn
            })
        }

        render () {
            return (
                <div className="container">
                    <div className="jumbotron mt-5">
                        <h1 className="text-center">Profile</h1>
                        <h4 className="text-center">{this.state.userid}</h4>
                        <h4 className="text-center">{this.state.msisdn}</h4>
                    </div>
                </div>
            )
        }
    }

    export default Profile;