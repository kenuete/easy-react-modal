import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Components/Modal';


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


ReactDOM.render(<App />, document.getElementById('app'));