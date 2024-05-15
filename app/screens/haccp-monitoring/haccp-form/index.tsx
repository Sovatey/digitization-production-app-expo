import React, { FC, useLayoutEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import Icon from "react-native-vector-icons/Ionicons"
import { AppStackScreenProps } from "app/navigators"
import { Text } from "app/components/v2"
import { View, ViewStyle, TouchableOpacity, KeyboardAvoidingView } from "react-native"
import ActivityBar from "app/components/v2/WaterTreatment/ActivityBar"
import CustomInput from "app/components/v2/DailyPreWater/CustomInput"
import { Checkbox, Divider } from "react-native-paper"
import { ScrollView } from "react-native-gesture-handler"
import { useNavigation, useRoute } from "@react-navigation/native"
import InstructionModal from "app/components/v2/InstructionModal"
import ActivityModal from "app/components/v2/ActivitylogModal"
interface HaccpLineFormScreenProps extends AppStackScreenProps<"HaccpLineForm"> {}
export const HaccpLineFormScreen: FC<HaccpLineFormScreenProps> = observer(
  function HaccpLineFormScreen() {
    const route = useRoute().params
    const navigation = useNavigation()
    const [showinstruction, setShowInstruction] = useState(false)
    const [showActivitylog, setShowActivitylog] = useState(false)
    const [formLineA, setFormLineA] = useState({
      side_wall: "",
      air_pressure: "",
      tem_preform: "",
      tw_pressure: "",
      FG: "",
      over_control: null,
      under_control: null,
      instruction: "",
    })
    const [formLineB, setFormLineB] = useState({
      water_pressure: "",
      nozzie_rinser: "",
      FG: "",
      over_control: false,
      under_control: false,
      smell: false,
      instruction: "",
      other: "",
    })
    const [errorsLineB, setErrorsLineB] = useState({
      water_pressure: true,
      nozzie_rinser: true,
      FG: true,
      over_control: true,
      under_control: true,
      smell: true,
      instruction: false,
      other: false,
    })
    const [errorsLineA, setErrorsLineA] = useState({
      side_wall: true,
      air_pressure: true,
      tem_preform: true,
      tw_pressure: true,
      FG: true,
      over_control: true,
      under_control: true,
      instruction: true,
    })

    const validateLineA = (errorsLineA) => {
      const errorlists = errorsLineA
      delete errorlists.instruction

      const notvalid = Object.values(errorlists).some((err) => err === true)

      if (notvalid) {
        return
      }
      navigation.goBack()
    }

    const validateLineB = (errorsLineB) => {
      const errorlists = errorsLineB
      delete errorlists.instruction
      delete errorlists.other
      delete errorlists.under_control
      delete errorlists.over_control
      delete errorlists.smell
      const notvalid = Object.values(errorlists).some((err) => err === true)
      if (notvalid) {
        return
      }
      navigation.goBack()
    }
    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: true,
        title: "Line - " + route?.line?.toString(),
        headerRight: () => (
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => {
              if ([4, 5, 6].includes(route?.line)) {
                validateLineA(errorsLineA)
              }
              if ([2, 3].includes(route?.line)) {
                validateLineB(errorsLineB)
              }
            }}
          >
            <Icon name="checkmark-sharp" size={24} color={"#0081F8"} />
            <Text primaryColor body1 semibold>
              Save
            </Text>
          </TouchableOpacity>
        ),
      })
    }, [route, navigation, errorsLineA, errorsLineB])

    return (
      <KeyboardAvoidingView behavior={"padding"} keyboardVerticalOffset={100} style={$root}>
        <ScrollView>
          <View style={[$outerContainer]}>
            {[4, 5, 6].includes(route?.line) && (
              <>
                <ActivityBar
                  direction="end"
                  showInfo
                  onClickinfo={() => setShowInstruction(true)}
                  onActivity={() => setShowActivitylog(true)}
                />
                <Divider style={{ marginVertical: 30, backgroundColor: "#A49B9B" }} />
                <View style={{ rowGap: 50 }}>
                  <View style={$containerHorizon}>
                    <View style={$width}>
                      <CustomInput
                        keyboardType="decimal-pad"
                        hintLimit="100 - 110%"
                        showIcon={false}
                        value={formLineA.side_wall?.toString() || ""}
                        onBlur={() => {
                          formLineA.side_wall !== ""
                            ? setErrorsLineA((pre) => ({ ...pre, side_wall: false }))
                            : setErrorsLineA((pre) => ({ ...pre, side_wall: true }))
                        }}
                        onChangeText={(text) => {
                          formLineA.side_wall !== ""
                            ? setErrorsLineA((pre) => ({ ...pre, side_wall: false }))
                            : setErrorsLineA((pre) => ({ ...pre, side_wall: true }))

                          setFormLineA((pre) => ({ ...pre, side_wall: text.trim() }))
                        }}
                        label="Side-wall"
                        errormessage={errorsLineA?.side_wall ? "សូមជ្រើសរើស side wall" : ""}
                      />
                    </View>
                    <View style={$width}>
                      <CustomInput
                        keyboardType="decimal-pad"
                        hintLimit="> 1.5 Bar"
                        value={formLineA.air_pressure?.toString() || ""}
                        showIcon={false}
                        onBlur={() => {
                          formLineA.air_pressure !== ""
                            ? setErrorsLineA((pre) => ({ ...pre, air_pressure: false }))
                            : setErrorsLineA((pre) => ({ ...pre, air_pressure: true }))
                        }}
                        onChangeText={(text) => {
                          formLineA.air_pressure !== ""
                            ? setErrorsLineA((pre) => ({ ...pre, air_pressure: false }))
                            : setErrorsLineA((pre) => ({ ...pre, air_pressure: true }))

                          setFormLineA((pre) => ({ ...pre, air_pressure: text.trim() }))
                        }}
                        label="Air Pressure"
                        errormessage={errorsLineA?.air_pressure ? "សូមជ្រើសរើស Air Pressure" : ""}
                      />
                    </View>
                    <View style={$width}>
                      <CustomInput
                        keyboardType="decimal-pad"
                        hintLimit="100 - 110%"
                        showIcon={false}
                        value={formLineA.tem_preform?.toString() || ""}
                        onBlur={() => {
                          formLineA.tem_preform !== ""
                            ? setErrorsLineA((pre) => ({ ...pre, tem_preform: false }))
                            : setErrorsLineA((pre) => ({ ...pre, tem_preform: true }))
                        }}
                        onChangeText={(text) => {
                          formLineA.tem_preform !== ""
                            ? setErrorsLineA((pre) => ({ ...pre, tem_preform: false }))
                            : setErrorsLineA((pre) => ({ ...pre, tem_preform: true }))

                          setFormLineA((pre) => ({ ...pre, tem_preform: text.trim() }))
                        }}
                        label="Temperature Preform"
                        errormessage={
                          errorsLineA?.tem_preform ? "សូមជ្រើសរើស Temperature Preform" : ""
                        }
                      />
                    </View>
                  </View>
                  <View style={$containerHorizon}>
                    <View style={$width}>
                      <CustomInput
                        keyboardType="decimal-pad"
                        value={formLineA.tw_pressure?.toString() || ""}
                        showIcon={false}
                        onBlur={() => {
                          formLineA.tw_pressure !== ""
                            ? setErrorsLineA((pre) => ({ ...pre, tw_pressure: false }))
                            : setErrorsLineA((pre) => ({ ...pre, tw_pressure: true }))
                        }}
                        onChangeText={(text) => {
                          formLineA.tw_pressure !== ""
                            ? setErrorsLineA((pre) => ({ ...pre, tw_pressure: false }))
                            : setErrorsLineA((pre) => ({ ...pre, tw_pressure: true }))

                          setFormLineA((pre) => ({ ...pre, tw_pressure: text.trim() }))
                        }}
                        hintLimit="> 1.5 bar / flow scale > 3"
                        label="Treated Water Pressure"
                        errormessage={
                          errorsLineA?.tw_pressure ? "សូមជ្រើសរើស Treated Water Pressure" : ""
                        }
                      />
                    </View>
                    <View style={$width}>
                      <CustomInput
                        keyboardType="decimal-pad"
                        showIcon={false}
                        value={formLineA.FG?.toString() || ""}
                        hintLimit="0.05 - 0.4 ppm"
                        onBlur={() => {
                          formLineA.FG !== ""
                            ? setErrorsLineA((pre) => ({ ...pre, FG: false }))
                            : setErrorsLineA((pre) => ({ ...pre, FG: true }))
                        }}
                        onChangeText={(text) => {
                          formLineA.FG !== ""
                            ? setErrorsLineA((pre) => ({ ...pre, FG: false }))
                            : setErrorsLineA((pre) => ({ ...pre, FG: true }))

                          setFormLineA((pre) => ({ ...pre, FG: text.trim() }))
                        }}
                        label="FG [ O3 ]"
                        errormessage={errorsLineA?.FG ? "សូមជ្រើសរើស FG [ O3 ]" : ""}
                      />
                    </View>
                    <View style={[$width, { marginTop: 20 }]}>
                      <Text style={{ margin: 0, fontSize: 18 }}>Activity Control</Text>

                      <View style={[$containerHorizon, { marginTop: 10 }]}>
                        <TouchableOpacity
                          style={$containerHorizon}
                          onPress={() => {
                            if (!formLineA.over_control) {
                              setFormLineA((pre) => ({
                                ...pre,
                                over_control: true,
                                under_control: false,
                              }))
                            } else {
                              setFormLineA((pre) => ({
                                ...pre,
                                over_control: true,
                                under_control: false,
                              }))
                            }

                            setErrorsLineA((pre) => ({
                              ...pre,
                              under_control: false,
                              over_control: false,
                            }))
                          }}
                        >
                          <Checkbox
                            status={
                              !formLineA?.over_control
                                ? false
                                : formLineA?.over_control
                                ? "checked"
                                : "unchecked"
                            }
                            onPress={() => {
                              if (!formLineA.over_control) {
                                setFormLineA((pre) => ({
                                  ...pre,
                                  over_control: true,
                                  under_control: false,
                                }))
                              } else {
                                setFormLineA((pre) => ({
                                  ...pre,
                                  over_control: true,
                                  under_control: false,
                                }))
                              }

                              setErrorsLineA((pre) => ({
                                ...pre,
                                under_control: false,
                                over_control: false,
                              }))
                            }}
                            color="#0081F8"
                          />
                          <Text>Overcontrol</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={$containerHorizon}
                          onPress={() => {
                            if (!formLineA.under_control) {
                              setFormLineA((pre) => ({
                                ...pre,
                                under_control: true,
                                over_control: false,
                              }))
                            } else {
                              setFormLineA((pre) => ({
                                ...pre,
                                under_control: true,
                                over_control: false,
                              }))
                            }

                            setErrorsLineA((pre) => ({
                              ...pre,
                              under_control: false,
                              over_control: false,
                            }))
                          }}
                        >
                          <Checkbox
                            status={
                              !formLineA?.under_control
                                ? false
                                : formLineA?.under_control
                                ? "checked"
                                : "unchecked"
                            }
                            onPress={() => {
                              if (!formLineA.under_control) {
                                setFormLineA((pre) => ({
                                  ...pre,
                                  under_control: true,
                                  over_control: false,
                                }))
                              } else {
                                setFormLineA((pre) => ({
                                  ...pre,
                                  under_control: true,
                                  over_control: false,
                                }))
                              }

                              setErrorsLineA((pre) => ({
                                ...pre,
                                under_control: false,
                                over_control: false,
                              }))
                            }}
                            color="#0081F8"
                          />
                          <Text>UnderControl</Text>
                        </TouchableOpacity>
                      </View>
                      <Text errorColor caption1 style={{ marginTop: 10 }}>
                        {errorsLineA?.over_control && errorsLineA?.under_control
                          ? "*សូម​ត្រួតពិនិត្យ"
                          : ""}
                      </Text>
                    </View>
                  </View>

                  <View style={$containerHorizon}>
                    <View style={$width}>
                      <CustomInput
                        showIcon={false}
                        onChangeText={(text) => {}}
                        label="Instruction "
                        errormessage={""}
                      />
                    </View>
                  </View>
                </View>
              </>
            )}

            {[2, 3].includes(route?.line) && (
              <>
                <ActivityBar
                  direction="end"
                  showInfo
                  onClickinfo={() => setShowInstruction(true)}
                  onActivity={() => setShowActivitylog(true)}
                />

                <Text title3>Bottle and Cap rinsing</Text>
                <Divider style={{ marginVertical: 30, backgroundColor: "#A49B9B" }} />
                <View style={{ rowGap: 25 }}>
                  <View style={$containerHorizon}>
                    <View style={$width}>
                      <CustomInput
                        showIcon={false}
                        keyboardType="decimal-pad"
                        value={formLineB.water_pressure?.toString() || ""}
                        onBlur={() => {
                          formLineB.water_pressure !== ""
                            ? setErrorsLineB((pre) => ({ ...pre, water_pressure: false }))
                            : setErrorsLineB((pre) => ({ ...pre, water_pressure: true }))
                        }}
                        onChangeText={(text) => {
                          formLineB.water_pressure !== ""
                            ? setErrorsLineB((pre) => ({ ...pre, water_pressure: false }))
                            : setErrorsLineB((pre) => ({ ...pre, water_pressure: true }))

                          setFormLineB((pre) => ({ ...pre, water_pressure: text.trim() }))
                        }}
                        label="Water Pressure"
                        hintLimit="> 1.0 bar"
                        errormessage={
                          errorsLineB?.water_pressure ? "សូមជ្រើសរើស water pressure" : ""
                        }
                      />
                    </View>
                    <View style={$width}>
                      <CustomInput
                        showIcon={false}
                        keyboardType="decimal-pad"
                        value={formLineB.nozzie_rinser?.toString() || ""}
                        onBlur={() => {
                          formLineB.nozzie_rinser !== ""
                            ? setErrorsLineB((pre) => ({ ...pre, nozzie_rinser: false }))
                            : setErrorsLineB((pre) => ({ ...pre, nozzie_rinser: true }))
                        }}
                        onChangeText={(text) => {
                          formLineB.nozzie_rinser !== ""
                            ? setErrorsLineB((pre) => ({ ...pre, nozzie_rinser: false }))
                            : setErrorsLineB((pre) => ({ ...pre, nozzie_rinser: true }))

                          setFormLineB((pre) => ({ ...pre, nozzie_rinser: text.trim() }))
                        }}
                        hintLimit="No one clog of 32/40"
                        label="Nozzies rinser"
                        errormessage={
                          errorsLineB?.nozzie_rinser ? "សូមជ្រើសរើស Nozzies Rinser" : ""
                        }
                      />
                    </View>
                  </View>

                  <Text title3>Filling and Capping</Text>
                  <Divider style={{ marginVertical: 5, backgroundColor: "#A49B9B" }} />

                  <View style={$containerHorizon}>
                    <View style={$width}>
                      <CustomInput
                        hintLimit="0.05 - 0.4 ppm"
                        showIcon={false}
                        keyboardType="decimal-pad"
                        value={formLineB.FG?.toString() || ""}
                        onBlur={() => {
                          formLineB.FG !== ""
                            ? setErrorsLineB((pre) => ({ ...pre, FG: false }))
                            : setErrorsLineB((pre) => ({ ...pre, FG: true }))
                        }}
                        onChangeText={(text) => {
                          formLineB.FG !== ""
                            ? setErrorsLineB((pre) => ({ ...pre, FG: false }))
                            : setErrorsLineB((pre) => ({ ...pre, FG: true }))

                          setFormLineB((pre) => ({ ...pre, FG: text.trim() }))
                        }}
                        label="FG [ O3 ] "
                        errormessage={errorsLineB?.FG ? "សូមជ្រើសរើស FG" : ""}
                      />
                    </View>

                    <View style={[$width, { marginTop: 20 }]}>
                      <Text style={{ margin: 5, fontSize: 18 }}>Activity Control</Text>

                      <View style={[$containerHorizon, { marginTop: 10 }]}>
                        <TouchableOpacity
                          style={$containerHorizon}
                          onPress={() => {
                            setErrorsLineB((pre) => ({ ...pre, smell: false }))
                            setFormLineB((pre) => ({
                              ...pre,
                              smell: pre?.smell === null ? true : !formLineB?.smell,
                            }))
                          }}
                        >
                          <Checkbox
                            status={
                              !formLineB?.smell ? false : formLineB?.smell ? "checked" : "unchecked"
                            }
                            onPress={() => {
                              setErrorsLineB((pre) => ({ ...pre, smell: false }))
                              setFormLineB((pre) => ({
                                ...pre,
                                smell: pre?.smell === null ? true : !formLineB?.smell,
                              }))
                            }}
                            color="#0081F8"
                          />
                          <Text>Smell</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={$containerHorizon}
                          onPress={() => {
                            setErrorsLineB((pre) => ({ ...pre, over_control: false }))
                            setFormLineB((pre) => ({
                              ...pre,
                              over_control:
                                pre?.over_control === null ? true : !formLineB?.over_control,
                            }))
                          }}
                        >
                          <Checkbox
                            status={
                              !formLineB?.over_control
                                ? false
                                : formLineB?.over_control
                                ? "checked"
                                : "unchecked"
                            }
                            onPress={() => {
                              setErrorsLineB((pre) => ({ ...pre, over_control: false }))
                              setFormLineB((pre) => ({
                                ...pre,
                                over_control:
                                  pre?.over_control === null ? true : !formLineB?.over_control,
                              }))
                            }}
                            color="#0081F8"
                          />
                          <Text>Overcontrol</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={$containerHorizon}
                          onPress={() => {
                            setErrorsLineB((pre) => ({ ...pre, under_control: false }))
                            setFormLineB((pre) => ({
                              ...pre,
                              under_control:
                                pre?.under_control === null ? true : !formLineB?.under_control,
                            }))
                          }}
                        >
                          <Checkbox
                            status={
                              !formLineB?.under_control
                                ? false
                                : formLineB?.under_control
                                ? "checked"
                                : "unchecked"
                            }
                            onPress={() => {
                              setErrorsLineB((pre) => ({ ...pre, under_control: false }))
                              setFormLineB((pre) => ({
                                ...pre,
                                under_control:
                                  pre?.under_control === null ? true : !formLineB?.under_control,
                              }))
                            }}
                            color="#0081F8"
                          />
                          <Text>UnderControl</Text>
                        </TouchableOpacity>
                      </View>
                      <Text errorColor caption1 style={{ marginTop: 10 }}>
                        {errorsLineB?.over_control &&
                        errorsLineB?.under_control &&
                        errorsLineB.smell
                          ? "*សូម​ត្រួតពិនិត្យ"
                          : ""}
                      </Text>
                    </View>
                  </View>

                  <View style={$containerHorizon}>
                    <View style={$width}>
                      <CustomInput
                        showIcon={false}
                        onChangeText={(text) => {}}
                        label="Take Action  "
                        errormessage={""}
                      />
                    </View>
                    <View style={$width}>
                      <CustomInput
                        showIcon={false}
                        onChangeText={(text) => {}}
                        label="Other "
                        errormessage={""}
                      />
                    </View>
                  </View>
                </View>
              </>
            )}

            <ActivityModal isVisible={showActivitylog} onClose={() => setShowActivitylog(false)} />
            <InstructionModal
              isVisible={showinstruction}
              key={Date.now().toString()}
              onClose={() => setShowInstruction(false)}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: "white",
}

const $outerContainer: ViewStyle = {
  marginHorizontal: 20,
  marginVertical: 15,
  marginBottom: 40,
}
const $width: ViewStyle = {
  flex: 1,
}
const $containerHorizon: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 25,
}
