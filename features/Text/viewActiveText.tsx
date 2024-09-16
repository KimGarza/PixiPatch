import { View, Text } from 'react-native';
import { useTextCtx } from './useTextCtx';

const ViewActiveText: React.FC = () => {

    const { text, styling } = useTextCtx();

    console.log("text", text)
    return (
        <View>
            <Text style={{
                zIndex: 99999999999999999999,
                textAlign: 'center',
                textAlignVertical: 'center',
                top: 200,
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                // fontFamily: '',
                fontSize: styling.size,
                color: styling.color,
                fontStyle: styling.style === 'italic' || styling.style === 'normal' ? styling.style : 'normal',
            }}>
                {text}
            </Text>
        </View>
    );
}

export default ViewActiveText;

