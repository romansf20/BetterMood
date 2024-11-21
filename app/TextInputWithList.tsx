import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { ChatGPTResponse } from './ChatResponseInterface';
import InputModule from './InputModule';  // Import the new InputModule component
import KnownPreferenceTags from './KnownPreferenceTags';

interface TextInputWithListProps {
  onTextChangeComplete: (text: string) => void;
	handleToggleCheck: (text: string) => void;
	handleItemSelect: (item: object) => void;
  isLoadingChat: boolean;
  chatResponse: ChatGPTResponse;
}

const TextInputWithList: React.FC<TextInputWithListProps> = ({ onTextChangeComplete, handleToggleCheck, handleItemSelect, isLoadingChat, chatResponse,  }) => {

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
			<TouchableOpacity onPress={() => handleItemSelect(item)}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <CheckBox
          checked={item.checked}
          onPress={() => handleToggleCheck(item.id)}
          containerStyle={styles.checkboxContainer}
          checkedIcon="check-circle-outline"
          uncheckedIcon="circle-outline"
          iconType="material-community"
        />
      </View>
      <Text style={styles.description} numberOfLines={4}>
        {item.description}
      </Text>
			</TouchableOpacity>
    </View>
  );

  return (
    <View>
      <FlatList
        data={chatResponse.options}  // Use the listData from state instead of chatResponse.options
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContentContainer}
      />
			<KnownPreferenceTags tags={chatResponse.knownPreferencesTags} />
      <InputModule onTextChangeComplete={onTextChangeComplete} isLoadingChat={isLoadingChat} />
    </View>
  );
};

const styles = StyleSheet.create({
  listContentContainer: {
    paddingVertical: 0,
  },
  itemContainer: {
    padding: 10,
    paddingTop: 6,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 1,
    lineHeight: 19,
  },
  checkboxContainer: {
    padding: 0,
    margin: 2,
    marginRight: 0,
    // transform: [{ scale: 0.9 }],
  },
});

export default TextInputWithList;
