# react-clap
 Simple clap component for react mimicking the behaviour of clap button on `medium.com`.

[Demo here](http://marudhupandiyang.in/react-clap/)

[Demo Source ](example/src/)

![img](https://i.imgur.com/sYLSmnq.gif)

## Installation

    npm install react-clap

## Usage

    import CardTree from 'react-clap';

Render it as show below

    <ClapComponent
      popupClapCount={this.state.clapsCount}
      maxClapCount={50}
      onChange={(newClapCount, diff) => {
       this.setState({
        clapsCount: newClapCount,
        totalClapCount: this.state.totalClapCount + diff,
       });
      }}
     />

### Props
 1. `popupClapCount`: (**Required**)The clap count to be used by the component. You can set it to any number. Make sure to update the component with new clap count `on change`. **Default: none**
 2. `maxClapCount`: (**Optional**)Max Clap count that the component can accumulate. **Default: 50**
 3. `onChange(newClapCount, diff)`: Function that will be called when `clap` stops. `newClapCount` will be the clap count accumulated by the component. `diff` is the value of difference between the `property` `popupClapCount` and the components `popupClapCount`. **Note:** `diff` would show wrong value when you don't send the new property on change. In the above example's onChange, the clapcount is updated in state and sent as prop to the component.




## Credits:
 1. “Clap” icon by [Yamini Ahluwalia](https://thenounproject.com/yaminiahluwalia) from the [Noun Project](https://thenounproject.com/).
 2. **[mo.js](https://github.com/legomushroom/mojs)**
