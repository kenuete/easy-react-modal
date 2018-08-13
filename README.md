# easy-react-modal
wrap any react component with this Modal component and turn your component as modal.


[Click for Demo](https://codepen.io/kenuete/project/editor/XmPydx).

How to use it?

###### Step1:
> npm install --save easy-react-modal

###### Step2: import the component 
> import Modal from 'easy-react-modal';

###### Step3: wrap your component which should open as modal. This can be react component or plain html tag.

                    <Modal hide={true} close={callbackFn}>
                         <div>Great!!</div>
                    </Modal>


### Props.
- **hide=false** to show the modal 
- **hide=true** to close it.
- **close={callbackFn}** callback function which will toggle the above hide value. You can also perform additional task inside this function.

### Optional Props.
- **styles={{background:'rgba(0,0,0,0.2)', container:'white'}}** pass styles props to change the color of background and the container.
- **width={'100px'}** pass width props to change the width of the container.

#Example

```
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'easy-react-modal';


class App extends  React.Component {
    constructor() {
        super();    
        this.state = {
            modalOff: true
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal () {
        this.setState( {
            modalOff: false
        });
    }

    closeModal () {
        this.setState( {
            modalOff: true
        });
    }

    render() {
        return (
            <React.Fragment>
                <button onClick={this.openModal}>OPEN MODAL</button>

                <Modal hide={this.state.modalOff} close={this.closeModal} styles={{background:'rgba(0,0,0,0.2)', container:'white'}}>
                    <div>Great!!</div>
                </Modal>
            </React.Fragment>
        );
    }
}
```