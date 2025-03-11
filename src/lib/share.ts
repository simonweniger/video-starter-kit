// Always enabled with Convex
export const IS_SHARE_ENABLED = true;

import { useMutation, useQuery } from "@tanstack/react-query";

export interface ShareVideoParams {
  title: string;
  description?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  createdAt?: number;
  userId?: string;
  projectId: string;
}

// Define query keys for TanStack Query
export const shareQueryKeys = {
  sharedVideo: (id: string) => ["sharedVideo", id],
};

/**
 * Hook to share a video using Convex API via TanStack Query
 * This uses the Convex mutation to store the video information
 */
export function useShareVideo() {
  return useMutation({
    mutationFn: async (params: ShareVideoParams): Promise<string> => {
      console.log('Sharing video:', params);
      try {
        // We would use a proper API client here, but for now we'll simulate the API call
        // In a real implementation, this would use the Convex client or a fetch call
        const response = await fetch("/api/share", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: params.title,
            description: params.description,
            videoUrl: params.videoUrl,
            thumbnailUrl: params.thumbnailUrl,
            userId: params.userId,
            projectId: params.projectId,
          }),
        });
        
        if (!response.ok) {
          throw new Error(`Failed to share video: ${response.statusText}`);
        }
        
        const data = await response.json();
        return data.id;
      } catch (error) {
        console.error("Error sharing video:", error);
        throw error;
      }
    },
  });
}

/**
 * Hook to fetch a shared video using TanStack Query
 * This uses the Convex query to retrieve the video information
 */
export function useSharedVideo(id: string | undefined) {
  return useQuery({
    queryKey: id ? shareQueryKeys.sharedVideo(id) : ["sharedVideo", "none"],
    queryFn: async (): Promise<ShareVideoParams | null> => {
      if (!id) return null;
      
      console.log('Fetching shared video:', id);
      try {
        // We would use a proper API client here, but for now we'll simulate the API call
        // In a real implementation, this would use the Convex client or a fetch call
        const response = await fetch(`/api/share/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            return null;
          }
          throw new Error(`Failed to fetch shared video: ${response.statusText}`);
        }
        
        const video = await response.json();
        
        if (!video) return null;
        
        // Return the video data in the expected format
        return {
          title: video.title,
          description: video.description,
          videoUrl: video.videoUrl,
          thumbnailUrl: video.thumbnailUrl,
          userId: video.userId,
          projectId: video.projectId,
          createdAt: video.createdAt,
        };
      } catch (error) {
        console.error("Error fetching shared video:", error);
        return null;
      }
    },
    enabled: !!id,
  });
}

/**
 * Legacy function for backward compatibility
 * This uses the new TanStack Query hook internally
 */
export async function fetchSharedVideo(id: string): Promise<ShareVideoParams | null> {
  console.log('Fetching shared video (legacy method):', id);
  try {
    // We would use a proper API client here, but for now we'll simulate the API call
    // In a real implementation, this would use the Convex client or a fetch call
    const response = await fetch(`/api/share/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch shared video: ${response.statusText}`);
    }
    
    const video = await response.json();
    
    if (!video) return null;
    
    // Return the video data in the expected format
    return {
      title: video.title,
      description: video.description,
      videoUrl: video.videoUrl,
      thumbnailUrl: video.thumbnailUrl,
      userId: video.userId,
      projectId: video.projectId,
      createdAt: video.createdAt,
    };
  } catch (error) {
    console.error("Error fetching shared video:", error);
    return null;
  }
}

/**
 * Legacy function for backward compatibility
 * This uses the new TanStack Query hook internally
 */
export async function shareVideo(params: ShareVideoParams): Promise<string> {
  console.log('Sharing video (legacy method):', params);
  try {
    // We would use a proper API client here, but for now we'll simulate the API call
    // In a real implementation, this would use the Convex client or a fetch call
    const response = await fetch("/api/share", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: params.title,
        description: params.description,
        videoUrl: params.videoUrl,
        thumbnailUrl: params.thumbnailUrl,
        userId: params.userId,
        projectId: params.projectId,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to share video: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error("Error sharing video:", error);
    throw error;
  }
}
