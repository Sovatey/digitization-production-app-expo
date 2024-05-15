import React, { forwardRef, useState } from "react"
import Icon from "react-native-vector-icons/AntDesign"
import { Button, Text, ModelItem, TextInput } from "../../../components/v2"
import { TextInput as TextInputRef, TouchableOpacity, View } from "react-native"
import styles from "./styles"
import { TextInputProps } from "react-native-paper"
// eslint-disable-next-line react/display-name
const CustomInput = forwardRef(
  (
    {
      label,
      placeholder,

      hintLimit = "",
      errormessage,
      disabled = true,
      onPress,
      onChangeText,
      showIcon = true,
      isFocus = false,
      ...textInputProps
    }: {
      label?: string
      placeholder?: string
      value: string
      hintLimit: string
      errormessage: string
      disabled: boolean
      onPress?: (params: any) => void
      onChangeText?: (text: string) => void
      isFocus?: boolean
      showIcon: boolean
    } & TextInputProps,
    ref?: React.Ref<TextInputRef>,
  ) => {
    return (
      <>
        {label && (
          <View style={{ flexDirection: "row" }}>
            {/* <Text style={{ margin: 5, color: "red", fontSize: 18 }}>*</Text> */}
            <Text style={{ margin: 0, fontSize: 18 }}>{label}</Text>
          </View>
        )}

        {hintLimit && (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text caption1 errorColor>
              ( {hintLimit})
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "#EFEBEB",
          }}
          onPress={() => {}}
        >
          {showIcon && <Icon style={{ marginLeft: 5 }} name="search1" size={19} color={"gray"} />}

          <TextInput
            style={{ backgroundColor: "white",width:"100%" }}
            ref={ref} // Forwarded ref
            multiline={false}
            editable={disabled}
            placeholder={placeholder || "Please Enter"}
            placeholderTextColor="gray"
            onChangeText={(text) => onChangeText(text)}
            {...textInputProps}
          ></TextInput>
        </TouchableOpacity>

        <View style={{ width: "100%", marginTop: 10 }}>
          <Text caption1 errorColor>
            {errormessage ? "*" + errormessage : ""}
          </Text>
        </View>
      </>
    )
  },
)

export default CustomInput