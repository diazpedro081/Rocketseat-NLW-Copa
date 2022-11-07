import { VStack, Heading, useToast } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { useState } from "react";
import { api } from "../services/api";
import { useNavigation } from "@react-navigation/native";

export function Find() {
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState("")
  const { navigate } = useNavigation()
  const toast = useToast()

  async function handleJoinPool() {
    try {
      if (!code.trim()) {
        return toast.show({
          title: "Informe o código",
          placement: "top-right",
          bgColor: "red.500",
        });
      }
      setIsLoading(true)

      await api.post("/pools/join", { code })
      toast.show({
        title: "Você entrou no bolão com sucesso",
        placement: "top-right",
        bgColor: "green.500",
      })
      setIsLoading(false)

      navigate("pools")

    } catch (error) {
      setIsLoading(false)
      if (error.response?.data?.message == "Pool not found") {
        toast.show({
          title: "Bolão não encontrado!",
          placement: "top-right",
          bgColor: "red.500",
        });
      } else if (error.response?.data?.message == "You already joined this pool") {
        toast.show({
          title: "Você já esta participando deste bolão",
          placement: "top-right",
          bgColor: "red.500",
        });
      } else {
        toast.show({
          title: "Bolão não encontrado",
          placement: "top-right",
          bgColor: "red.500",
        });
      }
    }
  }
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar bolão por código" showBackButton />
      <VStack mt={8} mx={5} alignItems="center">
        <Heading fontFamily="heading" color="white" fontSize="xl" mb={8} textAlign="center">
          Encontre um bolão através de{"\n"} seu código único
        </Heading>
        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
          onChangeText={setCode}
          autoCapitalize="characters"
        />
        <Button
          title="BUSCAR BOLÃO"
          isLoading={isLoading}
          onPress={handleJoinPool} />

      </VStack>
    </VStack>
  )
}