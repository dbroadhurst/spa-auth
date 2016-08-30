import React from 'react';
import ReactDOM from 'react-dom';

var imagesLoaded = {};

export default class LoadImage extends React.Component {

  constructor(props) {
    super(props);
    this.loaded = this.loaded.bind(this);
    this.end = this.end.bind(this);
  }

  loaded() {
    imagesLoaded[this.props.image] = true;
    this.elem.classList.remove('off');
    this.elem.classList.add('fade-on');
    this.elem.addEventListener('transitionend', this.end);
  }

  end() {
    this.elem.classList.remove('fade-on');
  }

  componentDidMount() {
    if (this.props.image) {
      this.elem = ReactDOM.findDOMNode(this);
      let image = new Image();
      image.src = this.props.image;
      image.addEventListener('load', this.loaded);
      this.elem.classList.add('off');
    }
  }

  render() {
    let style = Object.assign({}, this.props.style);
    if (this.props.image) {
      style = Object.assign(style, {'backgroundImage': 'url(' + this.props.image + ')'});
    }
    return (
      <div className={this.props.className} style={style}>
        {this.props.children}
      </div>
    )
  }
}
