import { Center, Text, Icon } from "native-base"
import { Fontisto } from "@expo/vector-icons"
import Logo from "../assets/logo.svg"
import { Button } from "../components/Button"
import { useAuth } from "../hooks/useAuth"
import { useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { api } from "../services/api"

export function SignIn() {
  const { signIn, isUserLoading, user, setUser } = useAuth()

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("@storage_Key:token")
        if (!token) {
          throw new Error
        }
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const userInfoResponse = await api.get("/me")
        if (!user) {
          throw new Error
        }
        setUser(userInfoResponse.data.user);
      } catch (error) {
        await AsyncStorage.removeItem("@storage_key:token")
      }
    }
    )
  }, [user])
  return (
    <Center flex={1} bgColor="gray.900" p={7}>
      <Logo width={212} height={40} />
      <Button
        type="SECONDARY"
        title="Entrar com Google"
        mt={12}
        leftIcon={
          <Icon as={Fontisto} name="google" color="white" size="md" />
        }
        onPress={signIn}
        isLoading={isUserLoading}
        _loading={{ _spinner: { color: "white" } }}
      />

      <Text color="white" textAlign="center" mt={4}>
        Não utilizamos nenhuma informação além {"\n"}
        do seu e-mail para criação da sua conta.
      </Text>
    </Center>
  )
}