export interface ChatGPTResponse {
  responseMessage: string;
  options: {
    id: string;
    name: string;
    description: string;
    checked: boolean;
    googleLocations: {
      name: string;
      checked: boolean;
    }[];
  }[]; 
  knownPreferencesTags: {
    tag: string;
    isProvided: boolean;
  }[];
}