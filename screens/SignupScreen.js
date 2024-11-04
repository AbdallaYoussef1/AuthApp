import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../Util/Auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/AuthContext";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const AuthCtx = useContext(AuthContext);

  async function Authentication({ email, password }) {
    setIsAuthenticating(true);
    try {
      const Token = await createUser(email, password);
      AuthCtx.authenticate(Token);
    } catch (error) {
      Alert.alert(
        "auth error",
        "please check your credentials and try again later"
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="We are Creating You...." />;
  }

  return <AuthContent onAuthenticate={Authentication} />;
}

export default SignupScreen;
