import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { signIn } from "../Util/Auth";
import { Alert } from "react-native";
import { AuthContext } from "../store/AuthContext";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const AuthCtx = useContext(AuthContext);

  async function AuthenticationLogIn({ email, password }) {
    setIsAuthenticating(true);
    try {
      const Token = await signIn(email, password);
      AuthCtx.authenticate(Token);
    } catch (error) {
      Alert.alert(
        "Authentication Error",
        "please check your password or email and try again later"
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging You...." />;
  }
  return <AuthContent isLogin onAuthenticate={AuthenticationLogIn} />;
}

export default LoginScreen;
