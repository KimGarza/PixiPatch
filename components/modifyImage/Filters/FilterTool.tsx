import React from 'react';
import { TouchableOpacity } from 'react-native';

interface FilterToolProps {
  children?: React.ReactNode;
  menuToggle: () => void;
}

const FilterTool: React.FC<FilterToolProps> = ({children, menuToggle}) => {

  const handleSelectFilters = () => {
    menuToggle(); // menu toggle comes in as false, so by ! it sets it to true same as the toggle for Filter select, then turns to false when icon is clicked again
  };

  return (
    <TouchableOpacity onPress={handleSelectFilters}>
        {children}
    </TouchableOpacity>
  );
}

export default FilterTool;
