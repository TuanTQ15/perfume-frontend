import React, { useState, useRef, useEffect, useCallback } from 'react';
import './CustomSelect.scss'

import Dropdown from './Dropdown';

const CustomSelect = ({ label, data, value, name, onChange, error, defaultOptionLabel, searchPlaceholder,disabled }) => {
  const [selectedValue, setSelectedValue] = useState(value);
  const [selectedIndex, setSelectedIndex] = useState(value !== '' ? data.indexOf(value) : null);
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState(data);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownEl = useRef();

  // Hide dropdown if clicked outside of dropdown
  const handleClickOutside = useCallback((e) => {
    if(showDropdown && e.target.closest('.dropdown') !== dropdownEl.current) {
      setShowDropdown(false);
      setSearch('');
      setOptions(data);
    }
  }, [showDropdown, setShowDropdown, dropdownEl, data]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, [handleClickOutside]);

  const changeSelectedHandler = (item, name, index) => {
    setSelectedValue(item);
    setSelectedIndex(index);
    setShowDropdown(false);
    onChange(item, name);
  }

  const searchChangeHandler = (e) => {
    setSearch(e.target.value);
    const filteredOptions = data.filter(opt => {
      return opt.toLowerCase().includes(e.target.value.trim().toLowerCase());
    });
    setOptions(filteredOptions);
  }

  return(
    <div className="form__group " >
     
      <div className="dropdown " ref={dropdownEl} 
           style={{background:"white", borderRadius:"0.35rem", border:"1px solid #d1d3e2"}}>
        <input type="hidden" name={name} value={value} onChange={(e) => onChange(value, name)} />
        <div className="dropdown__selected" onClick={() => setShowDropdown(!showDropdown&&!disabled)} >
          { selectedValue ? selectedValue : defaultOptionLabel ? defaultOptionLabel : 'Chọn sản phẩm' }
        </div>
        {showDropdown && 
          <Dropdown 
            searchPlaceholder={searchPlaceholder}
            search={search}
            searchChangeHandler={searchChangeHandler}
            options={options}
            selectedValue={selectedValue}
            selectedIndex={selectedIndex}
            changeSelectedHandler={changeSelectedHandler}
            name={name}
            data={data}
          />
        }
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default CustomSelect;