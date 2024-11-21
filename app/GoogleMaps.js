import axios from 'axios';

const API_KEY = 'AIzaSyC0CeWmsY6_fOD1ZvT-y6N3ilDvAaTV46U'; 

const GoogleMaps = {
  async getPlaceDetails(name) {
    try {
      // Step 1: Search for the place using the text search endpoint
      const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json`;
      const searchResponse = await axios.get(searchUrl, {
        params: {
          query: name,
          key: API_KEY,
        },
      });

      if (searchResponse.data.status !== 'OK') {
        throw new Error('Place not found');
      }

      // Get the first result from the search
      const place = searchResponse.data.results[0];
      const placeId = place.place_id;

      // Step 2: Fetch place details using the Place Details API
      const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json`;
      const detailsResponse = await axios.get(detailsUrl, {
        params: {
          place_id: placeId,
          key: API_KEY,
        },
      });

      if (detailsResponse.data.status !== 'OK') {
        throw new Error('Failed to retrieve place details');
      }

			console.log('detailsResponse ::: ' , detailsResponse.data.result);

      // Step 3: Extract relevant metadata
      const placeDetails = detailsResponse.data.result;
      const metadata = {
        title: placeDetails.name,
        description: placeDetails.formatted_address, // Google doesn't provide a direct "description" but this can serve
        rating: placeDetails.rating,
        user_ratings_total: placeDetails.user_ratings_total,
        photos: placeDetails.photos?.map((photo) => {
          return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${API_KEY}`;
        }) || [], // Use photo references to get image URLs
      };

      return metadata;
    } catch (error) {
      console.error('Error fetching place details:', error);
      return null;
    }
  },
};

export default GoogleMaps;
