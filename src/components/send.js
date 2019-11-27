import React from 'react';
// import PropTypes from 'prop-types';
import './send.css'
import { Form, TextArea, Button, Icon } from 'semantic-ui-react'
import { socket } from './socket';



class Send extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
      super(props);
      this.state = {
        msgData: [],
      }
    }
  
    // eslint-disable-next-line react/no-typos
    // componentDidMount() {
    // }
    sendMsg = () => {
        const target = document.getElementById('msgBox');
        console.log(target.value);
        
        socket.emit('which_user', null);
        socket.on('this_user', user => {
          console.log(user);
          if (target.value) {
            fetch('/api/message/send', {
              method: 'post',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify({message: target.value, user: user})
          });
          }
        target.value = null;
        });
    }

    render() {
      return (
        <div className="inputBox">
            <div className="textBox">
            <Form style={{height: '100px', backgroundColor: '#959eb1'}}>
            <TextArea id="msgBox" placeholder='Type Your Message'/>
            </Form>
            </div>
            <div className="sendBtn">
            <Button animated onClick={() => {this.sendMsg()}}>
            <Button.Content visible>Send</Button.Content>
            <Button.Content hidden>
                <Icon name='arrow right' />
            </Button.Content>
            </Button>
            </div>
            </div>
        );
    }
}

export default (Send)