import React, { useState , useEffect} from 'react';
import { View, Image, TouchableOpacity, Animated, StyleSheet, StatusBar, Text, SafeAreaView } from 'react-native';
// import { Dropdown } from 'react-native-element-dropdown';
import TextInputWithList from '../TextInputWithList';  // Import the new component
import ChatGPT from '../ChatGPT';  // Import the ChatGPT class
import { ChatGPTResponse } from '../ChatResponseInterface';  // Import the shared interface
// import GoogleMaps from '../GoogleMaps';  // Import the GoogleMaps module
import GoogleMapsListPreview from '../GoogleMapsListPreview';  // Import the GoogleMaps module
import { GooglePlaceDetail } from '../GooglePlaceDetailInterface'; // Assuming you have this interface for typing
// const imageUri = Asset.fromModule(require('../../../assets/dream_vac.jpg')).uri;
// import { Asset } from 'expo-asset';

export default function HomeScreen() {

	const defaultMessage = "Let us know what your ideal vacation looks like to help your next vacation be more fulfilling. \n\nTell us some details like your budget, trip duration, types of activities you enjoy, any hobbies or fun vacations you've had before, and who will join you."
	const [chatResponse, setChatResponse] = useState<ChatGPTResponse>({
		responseMessage: defaultMessage,
		options: [],
		knownPreferencesTags: [
			{tag:"Guests", isProvided:false},
			{tag:"Duration", isProvided:false},
			{tag:"Budget", isProvided:false},
			{tag:"Interests", isProvided:false},
			{tag:"Activities", isProvided:false},
			{tag:"Type", isProvided:false},
			{tag:"Food", isProvided:false},			
			{tag:"Past Favorite", isProvided:false},			
		]
	});

	const isInitialMessage = chatResponse.responseMessage === defaultMessage;


	const [isLoadingChat, setIsLoadingChat] = useState(false);
	// State to hold place data from Google Maps
	// const [placeData, setPlaceData] = useState<any>(null);
	const [topLevelSelection, setTopLevelSelection] = useState<any>(null);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fadeAnim = useState(new Animated.Value(1))[0];
	const images = [
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		require('@/assets/images/vacation1.jpg'),
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		require('@/assets/images/vacation2.jpg'),
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		require('@/assets/images/vacation3.jpg'),
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		require('@/assets/images/vacation4.jpg'),
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		require('@/assets/images/vacation5.jpg'),
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		require('@/assets/images/vacation6.jpg'),
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		require('@/assets/images/vacation7.jpg'),
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		require('@/assets/images/vacation8.jpg'),
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		require('@/assets/images/vacation9.jpg'),
	];
	
	useEffect(() => {
    const interval = setInterval(() => {
      // Start fading out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // After fading out, change the image
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);

        // Fade in the new image
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 3000); // Adjust the interval for image display duration

    return () => clearInterval(interval);
  }, [fadeAnim]);


  // Initialize the ChatGPT instance
  const chatGPT = new ChatGPT(); 
	async function handleReceivedSpeech(inText: any) {
		let validResponse = true;
		setIsLoadingChat(true);
		let response: ChatGPTResponse = await chatGPT.getChatGPTResponse(inText);
    console.log("handleReceivedSpeech::::::: ", inText + " : " , chatResponse);
		// Validate responseMessage and options
		if (response && response.responseMessage && typeof response.responseMessage !== 'string') {
			validResponse = false;
		}
		if (!Array.isArray(response.options) || response.options.some(option => 
				typeof option.id !== 'string' ||
				typeof option.name !== 'string' ||
				typeof option.description !== 'string' ||
				typeof option.checked !== 'boolean'
			)) {
			validResponse = false;
		}
	
		// If response is invalid, create a fallback response
		if (!validResponse) {
			response = {
				responseMessage: "Sorry, the format of the response is incorrect.",
				options: [], 
				knownPreferencesTags: []
			};
		}
		console.log("validResponse " + validResponse);
		setChatResponse(response);
		setIsLoadingChat(false);
		// Handle the response (you likely have code to process this here)
	}

	const onPlaceDetailSelect = (place: GooglePlaceDetail) => {
	}

	const handleToggleCheck = (id: string) => {
		const updatedData: ChatGPTResponse['options'] = chatResponse?.options?.map(item =>
			item.id === id ? { ...item, checked: !item.checked } : item
		);
		// Update only the 'options' field of chatResponse while preserving the other fields
		setChatResponse(prevState => ({
			...prevState,
			options: updatedData
		}));
	}
	const handleToggleCheckGoogleLocations = (id: string) => {

	}

  const handleItemSelect = async (item: object) => {
		console.log("index.handleItemSelect " , item);
		setTopLevelSelection(item);
  };
	
	const handleBack = () => {
		setTopLevelSelection(null)
	}

	return (
    <>
		<SafeAreaView style={styles.container}>
			
      <View style={styles.container}>
				<StatusBar barStyle="dark-content" />
				<View style={styles.header}>
					{
						topLevelSelection && (
							<TouchableOpacity onPress={() => handleBack()} style={styles.backButton}>
								<Text style={styles.backButtonText}>{"<"}</Text> 
							</TouchableOpacity>
						)
					}					
					<Text style={styles.headerTitle}>AI Travel Guide</Text>
				</View>

				{isInitialMessage && (
					 <View style={styles.imageWrapper}>
					 <Animated.Image
						 source={images[currentImageIndex]}
						 style={[styles.headerImage, { opacity: fadeAnim }]}
					 />
				 </View>
				)}

				{topLevelSelection && topLevelSelection.googleLocations?.length > 0 ?
					<GoogleMapsListPreview locations={topLevelSelection?.googleLocations} onPlaceSelect={onPlaceDetailSelect} handleToggleCheck={handleToggleCheckGoogleLocations} />
					: 
					<View style={styles.bodyText}>
						<View style={styles.topTextWrapper}>
							<Text style={styles.topText}>{chatResponse.responseMessage}</Text>
						</View>

						<TextInputWithList 
							onTextChangeComplete={handleReceivedSpeech} 
							handleToggleCheck={handleToggleCheck}
							handleItemSelect={handleItemSelect}
							isLoadingChat={isLoadingChat} 
							chatResponse={chatResponse}
						/>
					</View>
			}

      </View>
			</SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
		// backgroundColor: '#f8f8f8',
  },
  contentSize: {
    fontSize: 18,
  },
	header: {
		paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#f8f8f8',
    flexDirection: 'row',  // Align items in a row
    alignItems: 'center',  // Vertically align items in the center
    justifyContent: 'space-between',  // Distribute items evenly with space between them
    elevation: 4,  // Adds a shadow on Android
    shadowColor: '#000',  // Adds a shadow on iOS
    shadowOffset: { width: 0, height: 2 },  // iOS shadow properties
    shadowOpacity: 0.1,  // iOS shadow properties
    shadowRadius: 1,  // iOS shadow properties
  },
	backButton: {
		paddingLeft: 20,  // Add some padding for the back button
  },
  backButtonText: {
    fontSize: 24, // Size for the back arrow
		fontWeight: "700",		
  },
  headerTitle: {
		flex: 1,  // Take up remaining space for centering
    textAlign: 'center',  // Center the text horizontally
    fontSize: 20,
    fontWeight: 'bold',		
  },

  bodyText: {
    margin: 16,		
  },
  topTextWrapper: {
    paddingTop: 0,
    paddingBottom: 20,
  },
  topText: {
    fontSize: 16,
    lineHeight: 22,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
	imageWrapper: {
    width: '100%',
    height: 290,
    overflow: 'hidden',
  },
  headerImage: {
    width: '100%',
    height: 290,
    resizeMode: 'cover',		
  },

});
