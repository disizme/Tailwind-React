import React from 'react';
import './snackbar.css'
import { connect } from "react-redux";
import { deleteSystemMessage } from '../../actions/systemMessage/system_message';
import Store from '../../Store';

class NotificationBar extends React.Component {
  state = {
    open: false,
    message: null,
  };

  handleClick = () => {
    this.setState({open: !this.state.open});
    clearTimeout(this.timer)
  };

  stopTimer() {
    clearTimeout(this.timer)
  }

  startTimer() {
    this.timer = setTimeout(() => this.setState({
      open: false,
      message: null
    }), 10000)
  }

  resetMessage() {
    Store.dispatch(deleteSystemMessage())
  }

  componentDidUpdate(prevProps) {
    let {systemMessage} = this.props;
    let color = ''
    if (systemMessage !== prevProps.systemMessage) {
      if (systemMessage.message) {
        this.setState({
          message: systemMessage.message.message,
          open: true,
          color: color
        }, () => {
          this.resetMessage()
        })
      }
    }
    this.timer = setTimeout(()=> this.setState({
      open: false,
      message: null
    }),5000)
  }

  render() {
    if (this.state.open) {
      return (
        <div className={`snackbar ${this.state.message.variant}`} onMouseEnter={() => this.stopTimer()}
             onMouseLeave={() => this.startTimer()}>
          <span className='icon'
                style={{marginRight: "10px"}}>{this.state.message.variant === 'success' ? 'check' : this.state.message.variant}</span>
          <span className="message">{this.state.message.message}</span>
          <button className='icon' onClick={() => this.handleClick()}>close</button>
        </div>
      );
    } else return null
  }

}


function mapStateToProps(state) {
  let { systemMessage } = state
  return {
    systemMessage
  }
}

export default connect(mapStateToProps)(NotificationBar)
