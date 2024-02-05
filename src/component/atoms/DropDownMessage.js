import React, {useEffect, useRef} from 'react';
import DropdownAlert from 'react-native-dropdownalert';

const DropDownMessage = () => {
  const dropdownRef = useRef(null);
  const showAlert = (message, type = 'info') => {
    if (dropdownRef.current) {
        dropdownRef.current.alertWithType(type, '', message);
    }
  };

  return <DropdownAlert ref={dropdownRef} closeInterval={3000} />;
};

export default DropDownMessage;
