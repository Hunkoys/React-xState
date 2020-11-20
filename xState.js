import React from 'react';

//Notes: Maybe use key instead of id

const store = {};

export { xComponent as Component };
class xComponent extends React.Component {
  static id = 0;
  constructor(props) {
    super(props);

    this.state = {};

    // Changing id to key? change this too
    console.log('CONSTRUCTING... ' + this.xId);

    if (typeof props.id !== 'undefined') {
      this.xId = props.id;
      store[this.xId] = {
        refresh: () => {
          // If this setState becomes abandoned. You can delete xStore here
          this.setState(() => {
            return store[this.xId].state;
          });
        },
        state: {},
      };
    }

    this.xInit = this.xInit.bind(this);
    this.xSet = this.xSet.bind(this);
    this.xGet = this.xGet.bind(this);
  }

  xInit(state) {
    this.state = store[this.xId].state = Object.assign({}, state);
  }

  xSet(id, state) {
    if (id instanceof xComponent && typeof id.xId !== 'undefined') id = id.xId;

    if (typeof id === 'string' || id instanceof String) {
      if (typeof store[id] !== 'undefined') {
        store[id].state = { ...state };
        store[id].refresh();
      }
    }
    // console.log(store);
  }

  xGet(id = this.xId) {
    if (typeof store[id] !== 'undefined') {
      if (typeof store[id].state !== 'undefined') return store[id].state;
    }
    return {};
  }

  componentDidMount() {
    console.log('mounted ' + this.xId);

    // add events to target
  }

  componentWillUnmount() {
    console.log('Unmount ' + this.xId);
    // remove all registered events
  }
}
