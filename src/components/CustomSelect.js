import React from "react";
import { StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

export default function CustomSelect({dataList, onSelect, defaultButtonText, type}){
    return (
        <SelectDropdown
            data={dataList}
            defaultButtonText={defaultButtonText}
            onSelect={(selectedItem) => {
              onSelect(selectedItem.id)
            }}
            buttonTextAfterSelection={(selectedItem) => {
            return type === 'name'?selectedItem.name:`${selectedItem.code}-${selectedItem.name}`
            }}
            rowTextForSelection={(item) => {
            return type === 'name'?item.name:`${item.code}-${item.name}`;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
        />
        )
}

const styles = StyleSheet.create({
    label:{
      paddingTop:10,
      color:'grey'
    },
    dropdown1BtnStyle: {
      width: '100%',
      height: 50,
      backgroundColor: '#FFF',
      borderRadius: 8,
      borderWidth: 0,
      borderColor: '#444',
    },
    dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
    dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
    dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
    dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
  
  });