import { View, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import StyledIconContainer from '../styledIconContainer';

const FilterMenu = () => {

  return (
    <View style={styles.menuLayout}>
      <StyledIconContainer dimensions={40}>
        <Feather name={'sunrise'} size={15}/>
        <Feather name={'sunrise'} size={15}/>
        <Feather name={'sunrise'} size={15}/>
        <Feather name={'sunrise'} size={15}/>
        <Feather name={'sunrise'} size={15}/>
        <Feather name={'sunrise'} size={15}/>
      </StyledIconContainer>
    </View>
  );
}

export default FilterMenu;

const styles = StyleSheet.create({
  menuLayout: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 20,
    height: 200,
    width: 120,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 20,
    padding: 5,
  },
})