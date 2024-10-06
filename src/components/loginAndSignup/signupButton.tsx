import { TouchableOpacity, Text } from "react-native";
import GlobalTheme from '@/src/hooks/contexts/GlobalTheme';

const { colors } = GlobalTheme();

const LoginButton = () => {

    const handleLogin = () => {
    }

    return (
        <TouchableOpacity onPress={handleLogin}>
            <Text style={{fontFamily: 'ToThePoint', fontSize: 38, color: colors.DarkRust}}>Login      |       Sign Up</Text>
        </TouchableOpacity>
    );
}

export default LoginButton;