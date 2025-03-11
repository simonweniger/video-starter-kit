import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export type FileData = {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  // Adding fields to match UploadThing's ClientUploadedFileData structure
  serverData: { uploadedBy: string };
  key: string;
  customId?: string;
  appUrl?: string;
  fileHash?: string;
};

export type UploadResult = {
  fileId: string;
  url: string;
};

export function useConvexFileUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const createFile = useMutation(api.files.createFile);

  const startUpload = async (
    files: File[],
    metadata: { projectId?: string; userId?: string } = {}
  ): Promise<FileData[]> => {
    if (!files.length) return [];
    
    setIsUploading(true);
    
    try {
      const uploadedFiles = await Promise.all(
        files.map(async (file) => {
          // Step 1: Get a signed upload URL from Convex
          const uploadUrl = await generateUploadUrl();
          
          if (!uploadUrl || typeof uploadUrl !== 'string') {
            throw new Error('Failed to generate upload URL');
          }
          
          // Step 2: Upload the file directly to storage
          const result = await fetch(uploadUrl, {
            method: "POST",
            headers: {
              "Content-Type": file.type,
            },
            body: file,
          });
          
          if (!result.ok) {
            throw new Error(`Failed to upload file: ${result.statusText}`);
          }
          
          // Step 3: Get the storageId from the upload response
          const { storageId } = await result.json();
          
          // Step 4: Store file metadata in the database
          const fileResult = await createFile({
            storageId,
            name: file.name,
            type: file.type,
            size: file.size,
            projectId: metadata?.projectId,
            userId: metadata?.userId,
          });
          
          // Type assertion for the result
          const typedResult = fileResult as UploadResult;
          
          return {
            id: typedResult.fileId,
            name: file.name,
            url: typedResult.url,
            size: file.size,
            type: file.type,
            // Add fields to match UploadThing's structure
            serverData: { uploadedBy: metadata?.userId || 'anonymous' },
            key: storageId,
          };
        })
      );
      
      return uploadedFiles;
    } catch (error) {
      console.error("Error uploading files:", error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    startUpload,
    isUploading,
  };
}
