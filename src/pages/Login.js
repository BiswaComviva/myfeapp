import React , {Component} from 'react';
import ApiLayer from '../apiRequest/apiLayer';

class Login extends Component {
    constructor(){
        super()
        this.state = {
            userid: '',
            msisdn: ''
        }
        this.onchange = this.onchange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onchange(e) {
        this.setState({[e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        // const User = {
        //     userid: this.state.userid
        // }

        const userData = ApiLayer.getUser(this.state.userid);
        if(userData) {
            this.props.history.push('/profile');
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                        <h1 className="h3 mb-3 font-weight-normal">Please Login</h1>
                        <div className="form-group"></div>
                        <label htmlFor="text">UserId:</label>
                        <input type="text"
                               className="form-control"
                               name="userid"
                               placeholder="UserId." 
                               value={this.state.userid}
                               onChange={this.onchange}/>
                        <button type="submit" className="btn btn-lg btn-primary btn-block">
                            Log In
                        </button>
                        </form>
                    </div>
                </div>

            </div>

        )
    }

    
}

export default Login;