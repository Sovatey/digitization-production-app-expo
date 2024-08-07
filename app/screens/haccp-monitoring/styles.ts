import { StyleSheet } from "react-native"

export default StyleSheet.create({
  linePanel: {
    paddingVertical: 70,
    paddingHorizontal: 20,
    borderColor: "#BFB6B6",
    borderWidth: StyleSheet.hairlineWidth,

    borderBottomWidth: 1,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    // elevation: 3,
    // height: 1,
    width: "33.33%",
  },
  rightPane: {
    flex: 0.2,

    // backgroundColor: "#EFEBEB",
    // padding: 20,
    gap: 5,
    backgroundColor: "#F5F5F5",
  },
  leftPane: {
    flex: 1,
    // backgroundColor: "#F5F5F5",

    paddingHorizontal: 10,
    // paddingBottom:100
    // padding:10
  },
  displayButton: {
    borderWidth: 1,
    margin: 5,
    padding: 10,
    borderRadius: 10,
    borderColor: "gray",
  },
  textHeader: {
    fontSize: 18,
    color: "black",
  },
  dropdown: {
    marginLeft: 10,
    marginRight: 10,
    height: 50,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    width: 150,

    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#d3d3d3",
    margin: 10,
  },
  date_button: {
    backgroundColor: "#fff",
    borderWidth: 0.8,
    borderColor: "#d3d3d3",
    height: 47,
    borderRadius: 10,
    justifyContent: "center",
  },

  divider_space: {
    marginTop: 20,
  },
})
