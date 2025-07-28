import { defineOneEntry } from "oneentry";

import retrieveRefreshToken from "@/actions/auth/retrieveRefreshToken";

import storeRefreshToken from "@/actions/auth/storeRefreshToken";

export type ApiClientType = ReturnType<typeof defineOneEntry> | null;

let apiClient: ApiClientType = null;

async function setupApiClient(): Promise<ReturnType<typeof defineOneEntry>> {
  // Retrieve the API Url from environment variable

  const apiUrl = process.env.ONEENTRY_PROJECT_URL;

  // Throw an error if the api Url is not defined

  if (!apiUrl) {
    throw new Error("ONEENTRY_PROJECT_URL is missing");
  }

  // check if the API client is already initializes

  if (!apiClient) {
    try {
      // Retrieve the refresh token (if available) from storage

      const refreshToken = await retrieveRefreshToken();

      // Create a new instance of API client with the required configuration

      apiClient = defineOneEntry(apiUrl, {
        token: process.env.ONENETRY_TOKEN, //Token for authentication

        langCode: "en_US", //language code for the API

        auth: {
          refreshToken: refreshToken || undefined, // Use the retrieved refresh token or "undefined"

          customAuth: false, //Disable custom authentication

          saveFunction: async (newToken: string) => {
            //save the new refresh token when it is updated

            await storeRefreshToken(newToken);
          },
        },
      });
    } catch (error) {
      // Log the error if there is an issue retrieving the refresh token

      console.error("Error fetching refresh token:", error);
    }
  }

  //If the API client is still not initialized, throw an error

  if (!apiClient) {
    throw new Error("Failed to initialize API client");
  }

  //Return the initialized API client

  return apiClient;
}


export async function fetchApiClient(): Promise<
ReturnType<typeof defineOneEntry>
> {
  // check if the API client is already initialized

  if (!apiClient) {
    // If not, Initialize it

    await setupApiClient();
  }

  // At this point, 'apiClient' should not be null. If it is, throw an error

  if (!apiClient) {
    throw new Error("API client is still null after setup");
  }

  //Reutn the initialized API client

  return apiClient;
}