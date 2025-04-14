import { getPersonalFinanceClassIcon } from "@/utils/getPersonalFinanceClassIcon";
import { CRUD, PersonalFinanceClasses } from "@/utils/types";
import { Button, Tooltip, Text, Icon } from "@rneui/themed";
import { useState } from "react";
import { Modal, View } from "react-native"
import PersonalFinanceModal from "./PersonalFinanceModal";

export default () => {


    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState<PersonalFinanceClasses>();
    const [modalVisible, setModalVisible] = useState(false);
    // Display option to add a budget, expense, goals, etc.
    // Should be displayed universally on all the pages
    // that are not the sign in/sign up/forgot pin pages
    return (
        <View>
            <Tooltip
                height={180}
                width={100}
                visible={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                popover={
                    <View
                        style={{
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 5,

                        }}
                    >
                        {Object.entries(PersonalFinanceClasses).map(([key, value]) => (
                            <Button
                                key={key}
                                onPress={() => {
                                    setModalType(value);
                                    setOpen(false);
                                    setModalVisible(true);
                                }}
                            >
                                {getPersonalFinanceClassIcon(value)}
                                <Text>{value}</Text>
                            </Button>
                        ))}
                    </View>}
            >
                <Icon
                    name="add-outline"
                    type="ionicon"
                />
            </Tooltip>
            {modalType && modalVisible && (
                <PersonalFinanceModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    modalType={modalType}
                    variant={CRUD.CREATE}
                />
            )}
        </View>

    )

}