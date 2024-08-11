import { TouchableOpacity, Text } from "react-native";

const LoginButton = () => {

    const handleLogin = () => {
        console.log("handle login")
    }

    return (
        <TouchableOpacity onPress={handleLogin}>
            <Text style={{fontFamily: 'ToThePoint', fontSize: 38, color: '#581800'}}>Login      |       Sign Up</Text>
        </TouchableOpacity>
    );
}

export default LoginButton;