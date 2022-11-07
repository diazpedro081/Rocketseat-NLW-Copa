import { VStack, Heading, Text, useToast } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import Logo from "../assets/logo.svg";
import { useState } from "react";
import { api } from "../services/api";

export function New() {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const errorTitle = "error-title-toast";
  const errorServer = "error-server-toast";

  async function handlePoolCreate() {
    if (!title.trim()) {
      if (!toast.isActive(errorTitle)) {
        return toast.show({
          id: "error-title-toast",
          title: "Informe um nome para o seu bolão",
          placement: "top-right",
          bgColor: "red.500",
        });
      }
    }
    try {
      setIsLoading(true);

      await api.post("/pools", { title })

      toast.show({
        title: "Bolão criado com sucesso!",
        placement: "top-right",
        bgColor: "green.500",
      });

      setTitle("")
    } catch (error) {
      console.log(error);
      if (!toast.isActive(errorServer)) {
        toast.show({
          id: "error-server-toast",
          title: "O servidor não conseguir cadastrar o bolão",
          placement: "top-right",
          bgColor: "red.500",
        });
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão" />
      <VStack mt={8} mx={5} alignItems="center">
        <Logo />
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          my={8}
          textAlign="center"
        >
          Crie seu próprio bolão da copa e {"\n"} compartilhe entre amigos!
        </Heading>
        <Input
          mb={2}
          placeholder="Qual nome do seu bolão"
          onChangeText={setTitle}
          value={title}
        />
        <Button
          title="CRIAR MEU BOLÃO"
          onPress={handlePoolCreate}
          isLoading={isLoading}
        />
        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  );
}