import React, { ReactNode } from 'react'; // react node is union type includes all possible react children. (For the children in stylediconcontainer)
import { View, StyleSheet } from 'react-native';

interface StyledIconContainerProps  {
    children: ReactNode,
    dimensions: number
}

var dimensionProp = 0;

const StyledIconContainer: React.FC<StyledIconContainerProps> = ({ children, dimensions }) => {

  dimensionProp = dimensions;

    return (
      <>
        {React.Children.map(children, child => (
          <View style={[
            {width: dimensionProp,
              height: dimensionProp}, styles.iconContainer, 
          ]}>
             {child}
          </View>
        ))}
      </>
    );
};
  

const styles = StyleSheet.create({
iconContainer: {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#000',
  padding: 10,  
  borderRadius: 5, 
  backgroundColor: '#f9f3e5',
}
});

export default StyledIconContainer;