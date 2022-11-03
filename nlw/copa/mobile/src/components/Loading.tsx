import { Center, Spinner } from "native-base";
import { YellowBox } from "react-native";

export function Loading() {
    return (
        <Center flex={1} bg="gray.900">
            <Spinner color="Yellow.500" />
        </Center>
    )
}