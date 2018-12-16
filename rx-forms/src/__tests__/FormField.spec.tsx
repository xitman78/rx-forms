import * as React from 'react';
import { shallow, configure } from 'enzyme';
import * as EnzymeAdapter from 'enzyme-adapter-react-16';
import { RxControl, FormField } from '../index';

configure({ adapter: new EnzymeAdapter()});

describe('<FormField/>', () => {
  it('<FormField/> should render input and react on change event', () => {
    const control = new RxControl('name');
    const wrapper = shallow(
      <FormField control={control}>
        {(state, {handleInputChange}) => <input type="text" value={state.value} onChange={handleInputChange}/>}
      </FormField>);

    expect(wrapper.find('input').length).toBe(1);

    wrapper.find('input').simulate('change', {target: {value: 'My new value'}});

    expect(control.getState().value).toBe('My new value');
  });
});