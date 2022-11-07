import { useCallback, useState } from "react";
import { VStack, Icon, useToast, FlatList } from "native-base";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { PoolCard, PoolCardProps } from "../components/PoolCard";
import { Loading } from "../components/Loading";
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { api } from "../services/api";
import { EmptyPoolList } from "../components/EmptyPoolList";

export function Pools() {
  const [isLoading, setIsLoading] = useState(false);
  const [pools, setPools] = useState<PoolCardProps[]>([]);
  const { navigate } = useNavigation();
  const toast = useToast();
  const errorServer = "error-title-toast";

  async function fetchPools() {
    try {
      setIsLoading(true);
      const response = await api.get("/pools");
      const { pools } = response.data
      setPools(pools)
    } catch (error) {
      if (errorServer) {
        toast.show({
          id: "error-server-toast",
          title: "O servidor não conseguir achar os bolões",
          placement: "top-right",
          bgColor: "red.500",
        });
      }
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchPools();
  }, []));


  return (
    <VStack flex={1} background="gray.900">
      <Header title="Meus bolões" />
      <VStack
        mt={6}
        mx={5}
        borderBottomWidth={1}
        borderBottomColor="gray.600"
        pb={4}
        mb={4}
      >
        <Button
          title="BUSCAR BOLÃO POR CÓDIGO"
          leftIcon={
            <Icon as={Octicons} name="search" color="black" size="md" />
          }
          onPress={() => navigate("find")}
        />
      </VStack>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={pools}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PoolCard
              data={item}
              onPress={() => navigate("details", { id: item.id })}
            />
          )}
          px={5}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 20 }}
          ListEmptyComponent={() => <EmptyPoolList />}
        />
      )}
    </VStack>
  );
}