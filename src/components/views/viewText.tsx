import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTextCtx } from '@/src/features/Text/useTextCtx';
import MutableItem from '../mutableItem/MutableItem';
import { useEffect } from 'react';
import { TextItem } from '@/src/customTypes/itemTypes';

interface Props {
    texts: TextItem[],
}

const ViewText: React.FC<Props> = ({ texts}) => {

    const { activeText, textsCtx, typing, setActiveText } = useTextCtx();

    useEffect(() => {
    }, [textsCtx, activeText]);

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
            {texts.map((text, index) => (
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
