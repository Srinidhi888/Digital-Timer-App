import './index.css'

import {Component} from 'react'

class DigitalTimer extends Component {
  state = {inMinute: 25, inSecond: 0, status: true}

  onDecrease = () => {
    const {inMinute} = this.state
    if (inMinute > 1) {
      this.setState(prevState => ({inMinute: prevState.inMinute - 1}))
    }
  }

  onReset = () => {
    const {status} = this.state
    if (status === false) {
      clearInterval(this.secondId)
      this.setState(prevState => ({
        status: !prevState.status,
        inMinute: 25,
        inSecond: 0,
      }))
    }
  }

  onIncrease = () => {
    this.setState(prevState => ({inMinute: prevState.inMinute + 1}))
  }

  secondTick = () => {
    this.setState(prevState => ({inSecond: prevState.inSecond + 1}))
  }

  onStartPause = () => {
    const {status, inSecond, inMinute} = this.state
    const isCompleted = inMinute * 60 - inSecond
    if (status) {
      this.setState(prevState => ({status: !prevState.status}))
      this.secondId = setInterval(this.secondTick, 1000)
    } else {
      this.setState(prevState => ({status: !prevState.status}))
      clearInterval(this.secondId)
    }
  }

  render() {
    const {inMinute, inSecond, status} = this.state
    const isCompleted = inMinute * 60 - inSecond
    const min = Math.floor(isCompleted / 60)
    const sec = Math.floor(isCompleted % 60)
    const isValid = inSecond > 0
    const minutes = min > 9 ? min : `0${min}`
    const seconds = sec > 9 ? sec : `0${sec}`
    const imgUrl = status
      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
    const imgAlt = status ? 'play icon' : 'pause icon'
    const text = status ? 'Paused' : 'Running'
    return (
      <div className="total-bg">
        <h1>Digital Timer</h1>
        <div className="card-1">
          <div className="card">
            <div className="inner-card">
              <h1 className="time">
                {minutes}:{seconds}
              </h1>
              <p>{text}</p>
            </div>
          </div>
          <div className="inner-card-1">
            <div className="box">
              <div className="start">
                <button onClick={this.onStartPause} className="btn">
                  <img className="icon" src={imgUrl} alt={imgAlt} />

                  {status ? 'Start' : 'Pause'}
                </button>
              </div>
              <div className="start">
                <button onClick={this.onReset} className="btn">
                  <img
                    className="icon"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />
                  Reset
                </button>
              </div>
            </div>
            <p>Set Timer limit</p>
            <div className="timer">
              <button
                className="btn"
                disabled={isValid}
                onClick={this.onDecrease}
              >
                -
              </button>
              <p className="spcl">{inMinute}</p>
              <button
                className="btn"
                disabled={isValid}
                onClick={this.onIncrease}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
