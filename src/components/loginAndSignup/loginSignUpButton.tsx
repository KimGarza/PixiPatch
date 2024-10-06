import { TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";
import GlobalTheme from '@/src/hooks/contexts/GlobalTheme';

const { colors } = GlobalTheme();

const LoginSignUpButton = () => {

    const router = useRouter();

    return (
        <TouchableOpacity onPress={() => router.push('/(screens)/auth')}>
            <Text style={{fontFamily: 'ToThePoint', fontSize: 38, color: colors.DarkRust}}>Login      |       Sign Up</Text>
        </TouchableOpacity>
    );
}

export default LoginSignUpButton;