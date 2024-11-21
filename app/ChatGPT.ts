import OpenAI from 'openai';
import { ChatGPTResponse } from './ChatResponseInterface'; 

export default class ChatGPT {
  private openai: OpenAI;
	private conversationHistory: Array<{ role: string, content: string }>[] = [];
  private PROMPT: string = `
    You are a travel assistant helping users find vacation ideas based on their interests. 
    Work with the user to help them discover what they truly enjoy, based on their budget, 
    companions, duration, hobbies, level of activity vs relaxation they prefer, food preferences, 
    past favorite vacations, bucket list, world's or United States' most popular must-visit places.
		"options" could either be general destinations like "Hawaii" or more specific places like "Hotel Riu Palace Peninsula" or "Death Valley"
		
		If the "options" in your response are generic and broader destinations like like a country name or "hawaii", then also specify 
		5 more specific googleLocations like businesses in that destination, but make sure the are the 5 most popular attractions for that destination. 
		Adjust knownPreferencesTags based on user's input. Ex: 
		if they tell us their budget, set isProvided for "budget" to false, 
		if they specify a number of people or anything about their group, set isProvided for "Guests" to true,
		if they specify a number of days or weeks, set isProvided for "Duration" to true,
		if they specify a type of place like "hotel", "resort", "camping", "national park", "beach", "tropical", set isProvided for "Type" to true,
		if they say anything about the food like  "vegetarian", "vegan", "halal", "kosher", "gluten-free" set isProvided for "Food" to true,
		if they say anything about the type of activity like "hiking", "swimming", "diving", "snorkeling", "exploring", "relaxing", "sunbathing", "sightseeing", set isProvided for "Activities" to true,
		if they say anything about their interest like "history", "culture", "art", "music", "sports", set isProvided for "Interests" to true,
		if they say anything about their past favorite or fun vacation, set isProvided for "Past Favorite" to true,
		Your response should always be in valid JSON with this schema, where every knownPreferencesTags is included:
    {
      "responseMessage": "",
      "options": [{
				"id": "0", 
				"name": "Mexico", 
				"description": "", 
				"checked": false, 
				"googleLocations": [
						{"name": "Hotel Riu Palace Peninsula", "checked": false}
				]}],
			"knownPreferencesTags": [
				{tag:"Guests", isProvided:false},
				{tag:"Duration", isProvided:false},
				{tag:"Budget", isProvided:false},
				{tag:"Interests", isProvided:false},
				{tag:"Activities", isProvided:false},
				{tag:"Type", isProvided:false},
				{tag:"Food", isProvided:false},			
				{tag:"Past Favorite", isProvided:false},		
		]}
    Ensure the JSON is valid and properly structured.
		response-format”: {“type”: “json_object”};
		Number of options should be 3-8;
  `;

  constructor() {
    this.openai = new OpenAI({
      apiKey: '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',
    });
		this.conversationHistory.push({ role: 'system', content: this.PROMPT });
  }

  async getChatGPTResponse(userInput: string): Promise<ChatGPTResponse> {
    let responseMessage = "";

    try {
			this.conversationHistory.push({ role: 'user', content: userInput });
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
				messages: this.conversationHistory,
        temperature: 0.7,
        // max_tokens: 500,
        top_p: 1.0,
      });

      const assistantMessage = response.choices?.[0]?.message?.content;
			console.log("assistantMessage:::::::: ", assistantMessage);
			
			// Add the assistant's response to the conversation history
      this.conversationHistory.push({ role: 'assistant', content: assistantMessage });

      // Validate if the content is a valid JSON and return the parsed content
      if (assistantMessage) {
        try {
          const parsedResponse: ChatGPTResponse = JSON.parse(assistantMessage);
          return parsedResponse;
        } catch (jsonError) {
          console.error('Invalid JSON format from assistant:', assistantMessage);
          responseMessage = 'Error: Invalid JSON format from response';
        }
      } else {
        responseMessage = "No response from assistant";
      }
    } catch (error) {
      console.error('Error fetching OpenAI response:', error);
      responseMessage = 'Sorry, there was an error. Please try again later.';
    }

    // Return default response in case of error
    return {
      responseMessage: responseMessage,
      options: []
    };
  }
}