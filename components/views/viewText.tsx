import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTextCtx } from '@/features/Text/useTextCtx';
import { useEffect } from 'react';

const ViewText: React.FC = () => {

    const { activeText, texts, typing, setActiveText } = useTextCtx();

    useEffect(() => {
        console.log("activeText", activeText);
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
            {texts.map((text, index) => (
                <TouchableOpacity key={index} onPressIn={() => setActiveText(text)}>
                    <Text style={[ styles.texts, {
                        fontFamily: text.font,
                        fontSize: 32,
                        color: text.color,
                        // backgroundColor: text.highlight,
                    }]}>
                        {text.text}
                    </Text>
                </TouchableOpacity>
            ))}
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
