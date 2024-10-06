import React, { ReactNode } from 'react'; // react node is union type includes all possible react children. (For the children in stylediconcontainer)
import { View, Text, StyleSheet } from 'react-native';
import GlobalTheme from '@/src/hooks/contexts/GlobalTheme';

const { colors } = GlobalTheme();
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
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: .5,
    borderColor: 'black',
    padding: 2,  
    borderRadius: 5, 
    backgroundColor: colors.Canvas,
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
