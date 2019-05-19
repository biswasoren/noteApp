import React from 'react';
import './login.css';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

class Register extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
      super(props);
      this.state = {
        msgData: [],
      }
    }
    static propTypes = {
      updateState: PropTypes.func.isRequired,
    };
    // eslint-disable-next-line react/no-typos
    componentDidMount() {}
    register = () => {
      const userName = document.getElementById('userNameRgstr');
      const password = document.getElementById('passwordRgstr');
        fetch('/api/register/add', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ 
              userName: userName.value,
              password: password.value })
        }).then(() => {
          this.props.updateState({
            login : 'block',
            chat : 'none',
            register: 'none'
          });
        });
        userName.value = null;
        password.value = null;
    }
    render() {
      return (
        <div className="card">
        <div className="form">
          <div>
            <Input id='userNameRgstr' placeholder='Enter Username ' />
          </div>
          <div style={{
            margin: '10px 0'
          }}>
            <Input id='passwordRgstr' placeholder='Password'/>
          </div>
          <Button primary style={{
           margin: '10px 0'
           }}
           onClick={() => {
             this.register();
           }}>
            Register
          </Button>
          
          </div>
        </div>
      );
    }
  }

  export default (Register);