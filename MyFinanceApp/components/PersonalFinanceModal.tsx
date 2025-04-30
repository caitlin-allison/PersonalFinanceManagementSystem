import { CRUD, PersonalFinanceClasses } from "@/utils/types";
import { Modal } from "react-native"
import { Button, Icon, Text } from "@rneui/themed";
import { View } from "react-native";
interface PersonalFinanceModalProps {
    variant: CRUD;
    modalType: PersonalFinanceClasses;
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
}

export default ({
    modalVisible,
    setModalVisible,
    modalType,
    variant
}: PersonalFinanceModalProps) => {


    return (
        <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
            <Icon
                onPress={() => setModalVisible(false)}
                name="close-outline"
                type="ionicon"
                style={{
                    alignSelf: 'flex-end',
                    marginTop: 10,
                    marginRight: 10
                }}
            />
            <Text h1 style={{
                textAlign: 'center',
                marginTop: 25

            }}>{variant} {modalType}</Text>

            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    marginTop: 50,
                }}
            >
                <Button onPress={() => setModalVisible(false)}
                    type="solid"
                    style={{
                    }}>
                    <Icon name="save" type="material" color="white" />
                    <Text>Save</Text>
                </Button>
                <Button onPress={() => setModalVisible(false)}
                    style={{
                    }}>
                    <Text>Cancel</Text>
                </Button>
            </View>
        </Modal>
    )
}