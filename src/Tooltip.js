import React from 'react'
import PropTypes from 'prop-types'

class Tooltip extends React.PureComponent {
  constructor(props) {
    super(props)
    this.initRef = this.initRef.bind(this)
    this.state = {
    }
    this.onWindowClick = this.onWindowClick.bind(this)
  }

  initRef(node) {
    if(node) {
      this.node = node
      this.node.addEventListener('click', e => e.stopPropagation())
    } else {
      console.log('unbind');
      window.removeEventListener('click', this.onWindowClick)
    }
  }

  onWindowClick(e) {
    console.log('dismissing');
    if(this.props.dismiss)
      this.props.dismiss()
  }

  isArrowOnTop() {
    return this.state.y >= this.props.y
  }

  getStyle() {
    const {x,y} = this.props
    if(!(this.state.x && this.state.y)) {
      // we need to be able to compute the size, in order to place the tooltip
      return { position: 'fixed', visibility: 'hidden', paddingTop: '8px' }
    }
    const style = {
      top: this.state.y + 'px',
      left: this.state.x + 'px',
      zIndex: 999,
      position: 'fixed'
    }
    if(!this.isArrowOnTop()) {
      // tooltip on top
      style.paddingBottom = '8px'
    } else {
      style.paddingTop = '8px'
    }
    return style
  }

  getArrowStyle() {
    if(!this.state.x)
      return {}
    const style = {
      display: 'block',
      width:0,
      height:0,
      position:'absolute',
      borderLeft: '8px solid transparent',
      borderRight: '8px solid transparent',
    }
    if(!this.isArrowOnTop()) {
      // tooltip is on top, we need a bottom arrow
      style.borderTop = '8px solid black'
      style.bottom = 0
    } else {
      // tooltip is on bottom, we need an up arrow
      style.borderBottom = '8px solid black'
      style.top = 0
    }
    let left = this.props.x - this.state.x - 8
    if(left > this.node.clientWidth - 16)
      left = this.node.clientWidth - 16
    if(left < 0)
      left = 0
    style.left = left + 'px'
    return style
  }

  componentDidMount() {
    this.recalcDims()
    if(this.props.dismiss)
      setTimeout(() => {
        window.addEventListener('click', this.onWindowClick)
      }, 1000)
  }

  componentDidUpdate() {
    this.recalcDims()
  }

  recalcDims() {
    const pos = this.node.getBoundingClientRect()
    let {x, y} = this.props
    x -= pos.width / 2  // center on click
    // console.log(`width = ${pos.width}, x = ${x}, propx = ${this.props.x}, innerWidth = ${window.innerWidth}`);
    if(x + pos.width > window.innerWidth - 16) {
      // shift left
      x -= ((x + pos.width) - window.innerWidth + 16)
    }
    if(x < 0) {
      x = 1
    }
    if(y + pos.height > window.innerHeight && y > pos.height) {
      // make it on top
      y -= pos.height
    }
    if(this.state.x !== x || this.state.y !== y) {
      this.setState({
        x, y
      })
    }
  }

  render() {
    const cls = 'f1-tooltip ' + (this.props.className || '')
    const arrowCls = 'f1-tooltip--arrow ' + (this.isArrowOnTop() ? 'up' : 'down')
    return <div className={cls} ref={this.initRef} style={this.getStyle()}>
      <div className={arrowCls} style={this.getArrowStyle()}/>
      <div className='f1-tooltip--content'>
      {this.props.children}
      </div>
      </div>
  }
}

Tooltip.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  className: PropTypes.string,
  dismiss: PropTypes.func
}

export default Tooltip
