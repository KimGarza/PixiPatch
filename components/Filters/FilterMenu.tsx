import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import StyledIconContainer from '../styledIconContainer';
import { Fontisto } from '@expo/vector-icons';

interface FilterMenuProps {
  menuToggle: () => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({menuToggle}) => {

  const handleCloseMenu = () => {
    menuToggle();
  }

  return (
    <View style={styles.menuLayout}>

      <View style={styles.close}>

          <TouchableOpacity onPress={() => handleCloseMenu()}>
          <Fontisto name={'close'} size={25}/>
          </TouchableOpacity>

      </View>

      <View style={styles.bottomToolbar}>

        <StyledIconContainer dimensions={40}>
          <Feather name={'sunrise'} size={15}/>
          <Feather name={'sunrise'} size={15}/>
          <Feather name={'sunrise'} size={15}/>
          <Feather name={'sunrise'} size={15}/>
          <Feather name={'sunrise'} size={15}/>
          <Feather name={'sunrise'} size={15}/>
          <Feather name={'sunrise'} size={15}/>
          <Feather name={'sunrise'} size={15}/>
        </StyledIconContainer>

      </View>
    </View>
  );
}

export default FilterMenu;

const styles = StyleSheet.create({
  bottomToolbar: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    rowGap: 30,
    padding: 30,
    borderWidth: 1,
    borderColor: 'pink',
    borderRadius: 30
  },
  menuLayout: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  close: {
    position: 'absolute',
    right: '-1%',
    top: '8%',
    zIndex: 9999 
  },
})