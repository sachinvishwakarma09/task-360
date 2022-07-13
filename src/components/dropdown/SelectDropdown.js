import React, { useState } from 'react'
import ReactSelect from 'react-select'
import { components } from 'react-select';
import './SelectDropdown.css'

const options = [
  { label: "React", value: "react" },
  { label: "Angular", value: "angular" },
  { label: "Vue", value: "vue" },
  { label: "Ember", value: "ember" }
];

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        {props?.selectProps?.components?.MenuListFooter?.props?.multiselect &&
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />
        }
        {" "}<label>{props.label}</label>
      </components.Option>
    </div>
  );
};

const MenuList = (props) => {
  const {
    MenuListHeader = null,
    MenuListFooter = null
  } = props.selectProps.components;
  return (
    <components.MenuList {...props}>
      {props.children}
      {(props.children.length
        && props?.selectProps?.components?.MenuListFooter?.props?.multiselect) && MenuListFooter}
    </components.MenuList>
  );
};

const MenuListFooter = ({ multiselect, onSubmit, onClear }) => (
  <div className='react-select-footer'>
    <button onClick={onSubmit}>Submit</button>
    <button onClick={onClear}>Clear</button>
  </div>
);

const SelectDropdown = ({ searchable, multiselect, ...props }) => {

  const selectAll = { label: 'Select all', value: 'All' }
  const availableOptions = multiselect ? [selectAll, ...options] : options
  const [selectedOptions, setSelectedOptions] = useState(null)

  const changeHandler = (selected) => {
    if (multiselect) {
      let isSelectedAll = selected.find(({ value }) => value === 'All')
      if (isSelectedAll?.value === 'All') {
        setSelectedOptions(options)
      } else {
        setSelectedOptions(selected)
      }
    } else {
      setSelectedOptions(selected)
    }
  }

  const onClear = () => {
    setSelectedOptions(null)
  }

  const onSubmit = () => {
    console.log("Selected Options:", selectedOptions)
  }
  return (
    <div className='main'>
      <div className='content'>
        <ReactSelect
          isMulti={multiselect}
          options={availableOptions}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            Option,
            MenuList: MenuList,
            MenuListFooter: (<MenuListFooter
              multiselect={multiselect}
              onClear={onClear}
              onSubmit={onSubmit}
            />)
          }}
          onChange={changeHandler}
          allowSelectAll={true}
          value={selectedOptions}
          isSearchable={searchable}
        />
      </div>
    </div>
  )
}

export default SelectDropdown