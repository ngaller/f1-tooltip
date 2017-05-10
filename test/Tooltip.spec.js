import React from 'react'
import { mount } from 'enzyme'
import Tooltip from '../src/Tooltip'

describe('Tooltip', () => {
  it('should render its content', () => {
    const wrapper = mount(<Tooltip x={3} y={3}>
      <div className='inside'>Some content</div>
      </Tooltip>)
    expect(wrapper.find('.inside')).to.have.length(1)
  })
})
