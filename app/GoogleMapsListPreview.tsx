import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { GooglePlaceDetail } from './GooglePlaceDetailInterface';
import { GoogleLocation } from './GoogleLocationInterface';
import { CheckBox } from 'react-native-elements';
import GoogleMaps from './GoogleMaps'; // Assuming GoogleMaps.js is in the same directory
import GoogleImagePreview from './GoogleImagePreview'; // Import the new module

interface GoogleMapsListPreviewProps {
  locations: GoogleLocation[]; // List of place details
  onPlaceSelect: (place: GooglePlaceDetail) => void; // Function to handle place selection
	handleToggleCheck: (text: string) => void
}

const GoogleMapsListPreview: React.FC<GoogleMapsListPreviewProps> = ({ locations, onPlaceSelect, handleToggleCheck }) => {
  // State to hold the fetched place details for each location
  const [placeDetailsList, setPlaceDetailsList] = useState<(GooglePlaceDetail | null)[]>([]);
  const [loading, setLoading] = useState<{ [key: number]: boolean }>({}); // Object to track loading state for each location

  // For full-screen image preview
  const [isPreviewVisible, setPreviewVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [categoryTitle, setCategoryTitle] = useState('');

  // Function to fetch place details for a single location
  const fetchPlaceDetails = async (locationName: string, index: number) => {
    setLoading((prev) => ({ ...prev, [index]: true })); // Set loading state for this item
    const details = await GoogleMaps.getPlaceDetails(locationName);

    if (details) {
      setPlaceDetailsList((prevDetails) => {
        const updatedDetails = [...prevDetails];
        updatedDetails[index] = details; // Update the place details at the correct index
        return updatedDetails;
      });
    }
    setLoading((prev) => ({ ...prev, [index]: false })); // Turn off loading for this item
  };

  useEffect(() => {
    // Initialize place details state with empty values
    // setPlaceDetailsList(new Array(locations.length).fill(null));
    // Fetch details for each location on mount
    locations?.forEach((location, index) => {
      fetchPlaceDetails(location.name, index);
    });
  }, [locations]);

	const handleImagePress = (photos: string[], index: number, title: string) => {
    setSelectedImages(photos);
    setSelectedImageIndex(index);
    setCategoryTitle(title);
    setPreviewVisible(true);
  };

	const handleClosePreview = () => {
    setPreviewVisible(false);
  };

  // Render method for each item in the FlatList
	const renderItem = ({ item, index }: { item: GoogleLocation; index: number }) => ( 
    <View style={styles.itemContainer}>
      {loading[index] ? (
				<View>
        <Text style={styles.title}>{item.name}</Text>
				<ActivityIndicator size="small" color="#0000ff" />
				</View>
      ) : placeDetailsList[index] ? (
        <TouchableOpacity onPress={() => onPlaceSelect(placeDetailsList[index] as GooglePlaceDetail)}>
          <View>
						<View style={styles.headerContainer}>
							<Text style={styles.title}>{placeDetailsList[index]?.title}</Text>
							<CheckBox
								checked={item.checked}
								onPress={() => handleToggleCheck(item.name)}
								containerStyle={styles.checkboxContainer}
								checkedIcon="check-circle-outline"
								uncheckedIcon="circle-outline"
								iconType="material-community"
							/>
							</View>

            <Text>{placeDetailsList[index]?.description}</Text>
            {placeDetailsList[index]?.rating !== undefined && (
							<Text>{`Rating: ${placeDetailsList[index]?.rating} (${placeDetailsList[index]?.user_ratings_total} reviews)`}</Text>
						)}
            {/* Display photos if available */}
						{placeDetailsList[index]?.photos?.length > 0 && (
							<View style={styles.photoGridContainer}>
									{placeDetailsList[index]?.photos.map((photoUrl, i) => (
											<TouchableOpacity
													key={i}
													onPress={() => handleImagePress(placeDetailsList[index]?.photos || [], i, placeDetailsList[index]?.title || '')}
													style={styles.touchableImageContainer} // Add container style
											>
													<Image
															source={{ uri: photoUrl }}
															style={styles.gridImage}
													/>
											</TouchableOpacity>
									))}
							</View>
					)}
          </View>
        </TouchableOpacity>
      ) : (
        <Text>No details available</Text>
      )}
    </View>
  );

  // Explicit return statement for the JSX content
  return (
    <View style={styles.container}>
			 {/* Full-screen image preview */}
			 {isPreviewVisible && (
        <GoogleImagePreview
          images={selectedImages}
          categoryTitle={categoryTitle}
          initialIndex={selectedImageIndex}
          onClose={handleClosePreview}
        />
      )}
      <FlatList
        data={locations}
        keyExtractor={(item, index) => `${item.name}-${index}`} // Using both name and index as key
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
	photoGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  touchableImageContainer: {
    width: '49%', // Maintain the same width as the image to ensure the touchable area matches the image size
    height: 130,  // Same height as the image to prevent layout issues
    marginBottom: 6,
    borderRadius: 8,
  },
  gridImage: {
    width: '100%', // Ensure the image takes up the full width of the touchable container
    height: '100%', // Ensure the image takes up the full height of the touchable container
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  	headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
	checkboxContainer: {
    padding: 0,
    margin: 4,
    marginRight: 2,
    // transform: [{ scale: 0.9 }],
  },
});
export default GoogleMapsListPreview;
