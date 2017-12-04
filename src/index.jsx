import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

class ClapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popupClapCount: props.popupClapCount,
      // totalClapCount: props.totalClapCount,
    };

    this.incrementClapCount = this.incrementClapCount.bind(this);
    this.startClapping = this.startClapping.bind(this);
  }

  componentDidMount() {
    // const clapIconBoundingRect = this.clapIcon.getBoundingClientRect();
    // const clapContainerBoundRect = this.clapContainer.getBoundingClientRect();
    // debugger;
    this.circleBurstMotion = new mojs.Burst({
      parent: this.clapContainer,
      count: this.props.burstCirclesCount,
      radius: { 10: 70 },
      children: {
        shape: 'circle',
        fill: 'green',
        delay: 'stagger(7, 10)',
        speed: this.props.burstSpeed,
      },
      timeline: {
        repeat: Infinity,
      },
    });

    this.polygonBurstMotion = new mojs.Burst({
      parent: this.clapContainer,
      count: this.props.burstCirclesCount,
      radius: { 25: 75 },
      children: {
        shape: 'polygon',
        fill: 'orange',
        degreeShift: 180,
        delay: 'stagger(7, 10)',
        speed: this.props.burstSpeed,
      },
      timeline: {
        repeat: Infinity,
      },
    });

    this.clapCountMotion = new mojs.Html({
      el: this.clapCount,
      y: { 0: -55, duration: 100, easing: 'cubic.out' },
    });
  }

  getSvgIcon(hasClaps) {
    return (
      <svg ref={(el) => { this.clapIcon = el; }} id="clap--icon" xmlns="http://www.w3.org/2000/svg" viewBox="-549 338 100.1 125" className={`clap-icon ${hasClaps && 'clapped'}`}>
        <path d="M-471.2 366.8c1.2 1.1 1.9 2.6 2.3 4.1.4-.3.8-.5 1.2-.7 1-1.9.7-4.3-1-5.9-2-1.9-5.2-1.9-7.2.1l-.2.2c1.8.1 3.6.9 4.9 2.2zm-28.8 14c.4.9.7 1.9.8 3.1l16.5-16.9c.6-.6 1.4-1.1 2.1-1.5 1-1.9.7-4.4-.9-6-2-1.9-5.2-1.9-7.2.1l-15.5 15.9c2.3 2.2 3.1 3 4.2 5.3zm-38.9 39.7c-.1-8.9 3.2-17.2 9.4-23.6l18.6-19c.7-2 .5-4.1-.1-5.3-.8-1.8-1.3-2.3-3.6-4.5l-20.9 21.4c-10.6 10.8-11.2 27.6-2.3 39.3-.6-2.6-1-5.4-1.1-8.3z" />
        <path d="M-527.2 399.1l20.9-21.4c2.2 2.2 2.7 2.6 3.5 4.5.8 1.8 1 5.4-1.6 8l-11.8 12.2c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l34-35c1.9-2 5.2-2.1 7.2-.1 2 1.9 2 5.2.1 7.2l-24.7 25.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l28.5-29.3c2-2 5.2-2 7.1-.1 2 1.9 2 5.1.1 7.1l-28.5 29.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.4 1.7 0l24.7-25.3c1.9-2 5.1-2.1 7.1-.1 2 1.9 2 5.2.1 7.2l-24.7 25.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l14.6-15c2-2 5.2-2 7.2-.1 2 2 2.1 5.2.1 7.2l-27.6 28.4c-11.6 11.9-30.6 12.2-42.5.6-12-11.7-12.2-30.8-.6-42.7m18.1-48.4l-.7 4.9-2.2-4.4m7.6.9l-3.7 3.4 1.2-4.8m5.5 4.7l-4.8 1.6 3.1-3.9" fill="red" />
      </svg>
    );
  }

  incrementClapCount() {
    if (this.state.popupClapCount === this.props.maxClapCount) {
      return;
    }

    const newState = {
      popupClapCount: this.state.popupClapCount + 1,
    };

    if (newState.popupClapCount > this.props.maxClapCount) {
      newState.popupClapCount = this.props.maxClapCount;
    } else {
      // newState.totalClapCount = this.state.totalClapCount + 1;
    }

    this.setState({
      ...newState,
    });
  }

  startClapping() {
    this.clapInterval = setInterval(() => {
      this.incrementClapCount();
    }, this.props.clapIncrementTimeout);

    this.setState({
      isClapping: true,
    }, () => {
      this.polygonBurstMotion.play();
      this.circleBurstMotion.play();
      this.clapCountMotion.play();
    });
  }

  stopClapping() {
    if (this.state.isClapping) {
      clearInterval(this.clapInterval);
      if (this.props.onChange) {
        this.props.onChange(
          this.state.popupClapCount,
          (this.state.popupClapCount - this.props.popupClapCount),
        );
      }
      this.polygonBurstMotion.stop();
      this.circleBurstMotion.stop();
      this.clapCountMotion.stop();
      this.clapCountMotion.replayBackward();
      this.polygonBurstMotion.generate();
      this.circleBurstMotion.generate();

      this.setState({
        isClapping: false,
      });
    }
  }

  render() {
    return (
      <div className="clap-container">
        <button
          ref={(el) => { this.clapContainer = el; }}
          onMouseDown={() => { this.startClapping(); }}
          onMouseUp={() => { this.stopClapping(); }}
          onMouseOut={() => { this.stopClapping(); }}
          onBlur={() => { /* this.stopClapping(); */ }}
        >
          {this.getSvgIcon(this.state.popupClapCount)}
          <span ref={(el) => { this.clapCount = el; }}className={`user-clap-count ${this.state.isClapping && 'show'}`}>{this.state.popupClapCount}</span>
          <div className="clearfix" />
        </button>
      </div>
    );
  }
}

ClapComponent.defaultProps = {
  maxClapCount: 50,
  burstCirclesCount: 15,
  burstSpeed: 1.3,
  clapIncrementTimeout: 100,
  // totalClapCount: 0,
  onChange: () => {},
};

ClapComponent.propTypes = {
  maxClapCount: PropTypes.number,
  burstCirclesCount: PropTypes.number,
  burstSpeed: PropTypes.number,
  clapIncrementTimeout: PropTypes.number,
  popupClapCount: PropTypes.number.isRequired,
  // totalClapCount: PropTypes.number,
  onChange: PropTypes.func,
};

export default ClapComponent;
