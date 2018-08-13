import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import styles from './scss/_Modal.scss';

class Modal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            unmountStyle: false,
            hide: this.props.hide
        }
        this.close = this.close.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.escape = this.escape.bind(this);
    }

    componentDidMount() {
        !this.props.hide && document.addEventListener('mousedown', this.handleClick);
        !this.props.hide && document.addEventListener('keydown', this.escape);
    }

    componentWillMount() {
        // if (!this.props.hide) document.body.style.overflow = "hidden";
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick);
        document.removeEventListener('keydown', this.escape);
    }


    handleClick(e) {
        if(e.target.contains(this.wrapperRef)) {
            this.close();
        };
    }

    escape(e) {
        if (e.key == 'Escape') {
            this.close();
        }
    }

    close() {
        // this.setState({
        //     unmountStyle: true
        // }, () => {
        //     setTimeout(() => {
        //         this.setState({
        //             unmountStyle: false
        //         });
        if (this.props.close != undefined || this.props.close != null) this.props.close();
        //}, 300);
        //  });
    }


    getContainer() {
        return (
            <div className='framework-popup-container' style={this.state.unmountStyle ? { transform: 'scale(0)', backgroundColor: this.props.styles !==undefined && this.props.styles.container } : { width: this.props.width, backgroundColor: this.props.styles !==undefined && this.props.styles.container }}>
                <span onClick={this.close} className='framework-popup-close'></span>
                {this.props.children}
            </div>
        );
    }



    componentWillReceiveProps(nextProps) {

        if (nextProps.hide != this.props.hide) {

            if (nextProps.hide) {
                this.setState({
                    unmountStyle: true
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            unmountStyle: false,
                            hide: nextProps.hide
                        });

                    }, 250);
                });
                document.removeEventListener('mousedown', this.handleClick);
                document.removeEventListener('keydown', this.escape);
            }
            else {
                this.setState({
                    hide: nextProps.hide
                });
                document.addEventListener('mousedown', this.handleClick);
                document.addEventListener('keydown', this.escape);
            }

        }
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }


    render() {
        if (this.state.hide) return null;

        return (
            <div className='framework-popup'>
                <div className='framework-popup-backdrop' style={{backgroundColor: this.props.styles !==undefined && this.props.styles.background}}></div>
                <div className='framework-popup-container-wrapper'  ref={this.setWrapperRef}>
                    <ReactCSSTransitionGroup
                        transitionName="framework-popup"
                        component={React.Fragment}
                        transitionAppear={true}
                        transitionAppearTimeout={100}
                        transitionEnterTimeout={5000}
                        transitionLeaveTimeout={3000}>
                        {this.getContainer()}
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        );
    }
}

export default Modal;