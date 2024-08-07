import React from "react"
import { View } from "react-native"
import { Text } from "app/components/v2"
const BadgeTriangle = (
    {
        label,
        bgColor
    }:
    {
        label:string,
        bgColor?:string
    }
) => {
  return (
    <View
      style={{
        fontSize: 12.5,
        borderRadius: 0,
        backgroundColor: "red",
        position: "relative",
        justifyContent: "flex-end",
        height: 50,
        alignItems: "center",
        right: -90,
        top: -40,

        transform: [{ rotate: "45deg" }],
      }}
    >
      <Text whiteColor style={{ marginBottom: 10, marginRight: 14 }} caption2>
  
        {label}
      </Text>
    </View>
  )
}

export default BadgeTriangle
