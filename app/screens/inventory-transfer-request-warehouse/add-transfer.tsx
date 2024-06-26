import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle, FlatList, RefreshControl, TouchableOpacity, ScrollView } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { useStores } from "app/models"
import { showErrorMessage } from "app/utils-v2"
import ListInventoryTransfer from "app/components/v2/ListInventoryTransfer"
import { InventoryTransfer } from "app/models/inventory-transfer/inventory-transfer-model"
import { DataTable } from "react-native-paper"
import styles from "./styles"
import { BaseStyle, useTheme } from "app/theme-v2"
import { TextInput, Text } from "app/components/v2"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import moment from "moment"
import ProvidedListView from "./provided-list"
import ModalAddProvided from "./add-provided"
// import styles from "./styles"

interface AddTransferScreenProps extends AppStackScreenProps<"AddTransfer"> { }

export const AddTransferScreen: FC<AddTransferScreenProps> = observer(function AddTransferScreen({ route }
) {
    const { id } = route.params || { id: 0 };
    const { colors } = useTheme()
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing,] = useState(false)
    const [selectedAct, setSelectedAct] = useState<{ id: string; name: string }>({ id: '1', name: 'Info' });
    const { inventoryRequestStore } = useStores()
    const [item, setItem] = useState(null);
    const [provide, setProvide] = useState(null);
    const [isAddModalVisible, setAddModalVisible] = useState(false)
    const act = [
        { id: '1', name: 'Info' },
        { id: '2', name: 'Transfer' },
        { id: '3', name: 'Activities' },
    ]

    const handleActSelection = async (act: { id: string; name: string }) => {
        setSelectedAct(act);
        // You can perform different actions based on the selected act here
        switch (act.id) {
            case '1':
                const data = (await inventoryRequestStore.getdetail(id))
                setItem(data)
                // Code for handling selection of "Info" act
                break;
            case '2':
                const provide = (await inventoryRequestStore.getprovidelist(id))
                setProvide(provide)
                // Code for handling selection of "Transfer" act
                break;
            case '3':
                // Code for handling selection of "Activities" act
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        const get = async () => {
            const data = (await inventoryRequestStore.getdetail(id))
            setItem(data)
        }
        get()
    }, [])

    const refresh = async (showLoading = false) => {
        try {
            showLoading ? setLoading(true) : setRefreshing(true)
            const provide = (await inventoryRequestStore.getprovidelist(id))
            setProvide(provide)
            // console.log(data.items)

        } catch (e: any) {
            showErrorMessage('ទិន្នន័យមិនអាចទាញយកបាន', e.message)
        } finally {
            showLoading ? setLoading(false) : setRefreshing(false)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.leftPane} >
                <FlatList
                    data={act}
                    //   refreshControl={
                    //     <RefreshControl
                    //       colors={[colors.primary]}
                    //       tintColor={colors.primary}
                    //       refreshing={refreshing}
                    //       onRefresh={refresh}
                    //     />
                    //   }
                    renderItem={({ item }) => (
                        <View style={{ borderBottomWidth: 0.4, borderColor: '#d3d3d3' }}>
                            <TouchableOpacity onPress={() => handleActSelection(item)} style={[
                                selectedAct && selectedAct.id === item.id && { backgroundColor: '#ADD8E6' }]}
                            >
                                <View style={styles.itemContainer}>
                                    {/* <Icon name={'file-text-o'} size={20} color="gray" style={{ marginRight: 10, marginLeft: 5 }} /> */}
                                    <Text style={[styles.item,]}>
                                        {item.name}
                                    </Text>
                                    {/* {item.status == 'transfer-request' ?
                        <Icon name={'clock-o'} size={25} color="#2292EE" style={{ marginRight: 10, marginLeft: 'auto' }} />
                        : <></>} */}
                                </View>
                            </TouchableOpacity>

                        </View>
                    )}
                />
            </View>
            <View>
                {/* <ScrollView style={styles.rightPane}> */}
                {selectedAct.id === '1' ?
                    (
                        <ScrollView style={styles.rightPane}>
                            <View key={item?.id}>
                                <View style={{ flexDirection: 'row', width: '88%' }} key={item?.id}>
                                    <DataTable>
                                        <DataTable.Row style={styles.row}>
                                            <DataTable.Cell textStyle={styles.item}>
                                                <Text style={styles.textTitle}>Type: </Text>
                                                <Text style={styles.textBody}>{item?.transfer_type}</Text>
                                            </DataTable.Cell>
                                            <DataTable.Cell textStyle={styles.item}>
                                                <Text style={styles.textTitle}>Line: </Text>
                                                <Text style={styles.textBody}>{item?.line}</Text>
                                            </DataTable.Cell>
                                            <DataTable.Cell textStyle={styles.item}>
                                                <Text style={styles.textTitle}>Shift: </Text>
                                                <Text style={styles.textBody}>{item?.shift}</Text>
                                            </DataTable.Cell>
                                        </DataTable.Row>
                                        <DataTable.Row style={styles.row}>
                                            <DataTable.Cell textStyle={styles.item}>
                                                <Text style={styles.textTitle}>From Warehouse: </Text>
                                                <Text style={styles.textBody}>{item?.from_warehouse.map(w => w.whsCode)}</Text>
                                            </DataTable.Cell>
                                            <DataTable.Cell textStyle={styles.item}>
                                                <Text style={styles.textTitle}>To Warehouse: </Text>
                                                <Text style={styles.textBody}>{item?.to_warehouse.map(w => w.whsCode)}</Text>
                                            </DataTable.Cell>
                                            <DataTable.Cell textStyle={styles.item}>
                                                <Text style={styles.textTitle}>Bussiness Unit: </Text>
                                                <Text style={styles.textBody}>{item?.business_unit}</Text>
                                            </DataTable.Cell>
                                        </DataTable.Row>
                                        <DataTable.Row style={styles.row}>
                                            <DataTable.Cell textStyle={styles.item}>
                                                <Text style={styles.textTitle}>Created By: </Text>
                                                <Text style={styles.textBody}>{item?.createdBy}</Text>
                                            </DataTable.Cell>
                                            <DataTable.Cell textStyle={styles.item}>
                                                <Text style={styles.textTitle}>Created Date: </Text>
                                                <Text style={styles.textBody}>{moment(item?.createdDate).format('YYYY-MM-DD')}</Text>
                                            </DataTable.Cell>
                                            <DataTable.Cell textStyle={styles.item}>
                                                <Text style={styles.textTitle}>Status: </Text>
                                                <View style={[styles.dot, item?.state === 'completed' ? { backgroundColor: 'green' } : item?.state === 'rejected' ? { backgroundColor: 'red' } : item?.state === 'in-progress' ? { backgroundColor: '#E69B00' } : { backgroundColor: '#000' }]}></View>
                                                <Text style={[styles.textBody, { textTransform: 'capitalize' }]}> {item?.state}</Text>
                                            </DataTable.Cell>
                                        </DataTable.Row>
                                        <DataTable.Row style={styles.row}>
                                            <DataTable.Cell textStyle={styles.item}>
                                                <Text style={styles.textTitle}>Sap Doc No: </Text>
                                                <Text style={styles.textBody}>{item?.sapDocNo}</Text>
                                            </DataTable.Cell>
                                        </DataTable.Row>
                                    </DataTable>
                                </View>
                                <DataTable style={{ marginTop: '5%' }}>
                                    <DataTable.Header >
                                        <DataTable.Title style={{ flex: 0.3 }} textStyle={styles.textHeader}>No</DataTable.Title>
                                        <DataTable.Title style={{ flex: 0.8 }} textStyle={styles.textHeader}>Item Code</DataTable.Title>
                                        <DataTable.Title style={{ flex: 0.8 }} textStyle={styles.textHeader}>Item Name</DataTable.Title>
                                        <DataTable.Title style={{ flex: 0.5 }} textStyle={styles.textHeader}>Quantity</DataTable.Title>
                                        <DataTable.Title style={{ flex: 0.5 }} textStyle={styles.textHeader}>UoM</DataTable.Title>
                                        {/* <DataTable.Title style={{ flex: 0.5 }} textStyle={styles.textHeader}>Supplier</DataTable.Title> */}
                                        <DataTable.Title textStyle={styles.textHeader}>Remark</DataTable.Title>
                                    </DataTable.Header>

                                    {item?.item.map((i, index) =>
                                        <DataTable.Row style={{}} key={index}>
                                            <DataTable.Cell style={{ flex: 0.3 }} textStyle={styles.textHeader}>{index + 1}</DataTable.Cell>
                                            <DataTable.Cell style={{ flex: 0.8 }} textStyle={styles.textHeader}>{i.item_code}</DataTable.Cell>
                                            <DataTable.Cell style={{ flex: 0.8 }}><Text style={[styles.textHeader, { marginTop: 10, marginBottom: 10 }]}>{i.item_name}</Text></DataTable.Cell>
                                            <DataTable.Cell style={{ flex: 0.5 }} textStyle={styles.textHeader}>{i.quantity}</DataTable.Cell>
                                            <DataTable.Cell style={{ flex: 0.5 }} textStyle={styles.textHeader}>{i.uom}</DataTable.Cell>
                                            {/* <DataTable.Cell style={{ flex: 0.5 }}><Text style={[styles.textHeader, { marginTop: 10, marginBottom: 10 }]}>{i.supplier == null ? '-' : i.supplier}</Text></DataTable.Cell> */}
                                            <DataTable.Cell ><Text style={[styles.textHeader, { marginTop: 10, marginBottom: 10 }]}>{i.remark == null ? '-' : i.remark}</Text></DataTable.Cell>
                                        </DataTable.Row>
                                    )}
                                </DataTable>
                            </View>
                        </ScrollView>
                    ) :
                    selectedAct.id === '2' ?
                        <>
                            <View style={{ flexDirection: 'row', width: '80%', justifyContent: 'flex-end', margin: 20 }}>
                                <Icon name="plus" size={30} />
                                <TouchableOpacity onPress={() => (setAddModalVisible(true), console.log(item))}><Text style={{ fontSize: 18 }}>Add Transfer</Text></TouchableOpacity>
                            </View>
                            <View style={styles.divider}></View>
                            <FlatList
                                data={provide}
                                refreshControl={
                                    <RefreshControl
                                        colors={[colors.primary]}
                                        tintColor={colors.primary}
                                        refreshing={refreshing}
                                        onRefresh={refresh}
                                    />
                                }
                                renderItem={({ item, index }) =>
                                    <ProvidedListView data={item} index={index + 1} />}
                            />
                            <ModalAddProvided
                                data={item?.item}
                                onClose={() => {setAddModalVisible(false),refresh()}}
                                isVisible={isAddModalVisible}
                                tenden={item != null ? item.business_unit : ''}
                                id={item?.id}
                            />
                        </>
                        : <></>}
                {/* </ScrollView> */}

            </View>
        </View>
    )
})