import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTextCtx } from '@/features/Text/useTextCtx';
import MutableItem from '../mutableItem/MutableItem';
import { useEffect } from 'react';
import { TextItem } from '@/customTypes/itemTypes';

interface Props {
    textsFromCtx: TextItem[],
}

const ViewText: React.FC<Props> = ({ textsFromCtx }) => {

    const { activeText, texts, typing, setActiveText } = useTextCtx();

    useEffect(() => {
    }, [texts, activeText]);

    return (
        <View style={styles.allText}>
            <Text style={{
                textAlign: 'center',
                textAlignVertical: 'center',
                fontFamily: activeText.font,
                fontSize: 32,
                color: activeText.color,
                // backgroundColor: activeText.highlight,
            }}>
                {typing}
            </Text>

            {/* user can tap on another existing text to change active text to that one */}
            <View>
            {textsFromCtx.map((text, index) => (
                <MutableItem
                    key={index}
                    item={text}
                />
            ))}
        </View>
            
        </View>
    );
}

export default ViewText;

const styles = StyleSheet.create({
    allText: {
      minWidth: 150,
      maxWidth: '80%',
      alignSelf: 'center',
    },
    texts: {
        zIndex: 9,
        textAlign: 'center',
        textAlignVertical: 'center',
        position: 'absolute'
    }
})
