import axios from "axios";

export const spaceXApi = axios.create({
  baseURL: 'https://api.spacex.land/rest/'
});