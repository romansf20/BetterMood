import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Badge } from 'react-native-elements';

interface TagItem {
  tag: string;
  isProvided: boolean;
}

interface KnownPreferenceTagsProps {
  tags: TagItem[];
}

const KnownPreferenceTags: React.FC<KnownPreferenceTagsProps> = ({ tags }) => {
  return (
    <View style={styles.container}>
      {tags && tags.map((item, index) => (
        <Badge
          key={index}
          value={item.tag}
          status={item.isProvided ? 'success' : 'error'}
          containerStyle={styles.badgeContainer}
					textStyle={styles.badgeText}
					badgeStyle={styles.badgeStyle} 
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
		marginBottom: 14,
  },
  badgeContainer: {
		margin: 1,
  },
	badgeText: {
  },
	badgeStyle: {
		padding: 1,          // Add 5 pixels padding around the text
    minWidth: 30,        // Minimum width for the badge to prevent cutting off
    minHeight: 22,       // Minimum height for the badge to accommodate padding
    justifyContent: 'center',  // Ensure text is vertically centered
    alignItems: 'center'
	},
});

export default KnownPreferenceTags;