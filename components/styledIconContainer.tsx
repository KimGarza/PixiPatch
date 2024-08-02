import React, { ReactNode } from 'react'; // react node is union type includes all possible react children. (For the children in stylediconcontainer)
import { View, Text, StyleSheet } from 'react-native';

interface StyledIconContainerProps  {
    children: ReactNode,
    dimensions: number
}

var dimensionProp = 0;

const StyledIconContainer: React.FC<StyledIconContainerProps> = ({ children, dimensions }) => {

  dimensionProp = dimensions;
    try { 
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
  } catch (error) {
    console.log("Error rendering StyledIconContainer: ", error);
    return (
      <View style={errorStyles.errorContainer}>
        <Text style={errorStyles.errorText}>Failed to render icon container.</Text>
      </View>
    );
  }
};
  
export default StyledIconContainer;

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
},
});

const errorStyles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
  });
