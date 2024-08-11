import { TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";

const LoginSignUpButton = () => {

    const router = useRouter();

    return (
        <TouchableOpacity onPress={() => router.push('/(screens)/login')}>
            <Text style={{fontFamily: 'ToThePoint', fontSize: 38, color: '#581800'}}>Login      |       Sign Up</Text>
        </TouchableOpacity>
    );
}

export default LoginSignUpButton;