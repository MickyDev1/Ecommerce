"use server";

import { IAttributes } from "oneentry/dist/base/utils";

import { fetchApiClient } from "@/lib/oneentry";

import { cookies } from "next/headers";

import { redirect } from "next/navigation";

interface IErroredResponse {
    error: string;

    message: string;
}

export const getLoginFormData = async (): Promise<IAttributes[]> => {
    try{
        const apiClient = await fetchApiClient();

        const response = await apiClient?.Forms.getFormByMarker('sign_in', 'en_US');

        return response?.attributes as unknown as IAttributes[];
    } catch (error: unknown) {
        console.error(error);

        throw new Error('Fetching form data failed');
    }
};

export const handleLoginSubmit = async (inputValues: { email: string; password: string; }) => {
    try {
        const ApiClient = await fetchApiClient();

        const data = {
            authData: [
                { marker: 'email', value: inputValues.email },

                { marker: 'password', value: inputValues.password }
            ]
        };

        const response = await ApiClient.AuthProvider.auth('email', data);

        if (!response?.userIdentifier) {
            const error = response as unknown as IErroredResponse;

            return {
                message: error.message,
            };
        }

        (await cookies()).set('access_token', response.accessToken, {
            maxAge: 60 * 60 * 24, // 24 hours
        });

        (await cookies()).set('refresh_token', response.refreshToken, {
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });
    } catch (error: unknown) {
        console.error(error);

        interface AuthError {
            statusCode: number;
            message: string;
        }

        if (
            typeof error === "object" &&
            error !== null &&
            "statusCode" in error &&
            (error as AuthError).statusCode === 401
        ) {
            return { message: (error as AuthError).message };
        }

        throw new Error('Failed to login, Please try again!');
    }

    redirect('/');
};