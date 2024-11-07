'use server';

import { ID, Query } from 'node-appwrite';
import { BUCKET_ID, DATABASE_ID, databases, ENDPOINT, PATIENT_COLLECTION_ID, PROJECT_ID, storage, users } from '../appwrite.config';
import { parseStringify } from '../utils';
import { Input } from 'postcss';
import { InputFile }  from "node-appwrite/file";



export const createUser = async (user: CreateUserParams) => {
    try {
        // Create the user in Appwrite
        const newUser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined, 
            user.name
        );

        // Return the new user for redirection purposes
        return newUser; 
    } catch (error: any) {
        if (error?.code === 409) {
            // Handle case where the user already exists
            const documents = await users.list([Query.equal('email', [user.email])]);
            return documents?.users[0]; // Return the first user found
        }
        throw error; // Throw other errors if not handled
    }
};



export const getUser = async (userId: string) =>{
try{
const user = await users.get(userId);

return parseStringify(user);
} catch (error) {
    console.log (error)
}
}

export const getPatient = async (userId: string) =>{
    try{
    const patients = await databases.listDocuments(
        DATABASE_ID!,
        PATIENT_COLLECTION_ID!,
        [Query.equal('userId', userId)]
    );
    
    return parseStringify(patients.documents[0]);
    } catch (error) {
        console.log (error)
    }
    }

export const registerPatient = async ({identificationDocument, ...patient}:
    RegisterUserParams) => {
        try{
        let file;

        if (identificationDocument){
            const inputFile = InputFile.fromBuffer(
                identificationDocument?.get('blobFile') as Blob,
                identificationDocument?.get('FileName') as string,
            )

            file = await storage.createFile(BUCKET_ID!, ID.unique(),inputFile)
        }


       const newPatient = await databases.createDocument(
        DATABASE_ID!,
        PATIENT_COLLECTION_ID!,
        ID.unique(),
        {
            identificationDocumentId: file?.$id || null, 
            identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
            ...patient
        }
       )

       return parseStringify(newPatient);

        }  catch (error){
            console.log(error);
        }
 }

