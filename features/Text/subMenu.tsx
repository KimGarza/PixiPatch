import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import GlobalDimensions from '@/components/dimensions/globalDimensions';
import { useFonts } from 'expo-font';
import { useTextCtx } from './useTextCtx';

const { width, height, headerHeight } = GlobalDimensions();

interface Props {
  name: string;
}

const SubMenu = ({ name }: Props) => {
  const { setStyling, styling } = useTextCtx();

  const [fontsLoaded] = useFonts({
    Aktura: require('../../assets/fonts/Aktura-Regular.otf'),
    'Arsenal-Italic': require('../../assets/fonts/Arsenal-Italic.ttf'),
    'Arsenal-Regular': require('../../assets/fonts/Arsenal-Regular.ttf'),
    BadScript: require('../../assets/fonts/BadScript-Regular.ttf'),
    DummyDaze: require('../../assets/fonts/DummyDaze.ttf'),
    RockSalt: require('../../assets/fonts/RockSalt-Regular.ttf'),
    SahirYesta: require('../../assets/fonts/SahirYesta.otf'),
    skeleboom: require('../../assets/fonts/skeleboom.ttf'),
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    SpicyRice: require('../../assets/fonts/SpicyRice-Regular.ttf'),
    'Tangerine-Bold': require('../../assets/fonts/Tangerine-Bold.ttf'),
    'Tangerine-Regular': require('../../assets/fonts/Tangerine-Regular.ttf'),
    Thegrakle: require('../../assets/fonts/Thegralke.ttf'),
    ToThePoint: require('../../assets/fonts/ToThePointRegular-n9y4.ttf'),
    UncialAntiqua: require('../../assets/fonts/UncialAntiqua-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const expoFonts = [
    'Aktura',
    'Arsenal-Italic',
    'Arsenal-Regular',
    'BadScript',
    'DummyDaze',
    'RockSalt',
    'SahirYesta',
    'skeleboom',
    'SpaceMono',
    'SpicyRice',
    'Tangerine-Bold',
    'Tangerine-Regular',
    'Thegrakle',
    'ToThePoint',
    'UncialAntiqua',
  ];

  return (
    <View>
      {name == 'font' ? (
        <ScrollView
          horizontal
          contentContainerStyle={styles.scrollViewContent}
          showsHorizontalScrollIndicator={false}
          bounces={true}
        >
          <View style={styles.font}>
            {expoFonts.map((font, index) => (
              <TouchableOpacity
                key={index}
                // onPress={() =>
                //   setStyling({
                //     font: font,
                //     size: styling.size,
                //     color: styling.color,
                //     style: styling.style as 'normal' | 'italic' | 'bold',
                //   })
                // }
              >
                <Text style={[{ fontFamily: `${font}` }, styles.text]}>
                  Elemental Editor
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      ) : name == 'size' ? (
        <View></View>
      ) : name == 'color' ? (
        <View></View>
      ) : name == 'style' ? (
        <View></View>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    alignItems: 'center', // centers items vertically in the scroll view
  },
  font: {
    flexDirection: 'row', // Horizontal layout
    alignItems: 'center', // Align items vertically in the row
    height: 50,
  },
  text: {
    //   borderWidth: 1,
    //   borderColor: 'gray',
    //   borderRadius: 8,
    fontSize: 26,
    paddingHorizontal: 10,
    padding: 5,
    marginHorizontal: 5, // Add spacing between each text element
  },
});

export default SubMenu;
