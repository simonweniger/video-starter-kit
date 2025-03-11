import { useEffect } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { useSharedVideo, type ShareVideoParams } from "@/lib/share";
import { DownloadIcon } from "lucide-react";

export default function SharePage() {
  const { id } = useParams({ from: "/share/$id" });
  const navigate = useNavigate();
  const { data: shareData, isLoading, error } = useSharedVideo(id);

  // Handle navigation if video not found or error
  useEffect(() => {
    if (!isLoading) {
      if (error || !shareData) {
        // Navigate to 404 or home page if video not found or error
        navigate({ to: "/" });
      }
    }
  }, [shareData, isLoading, error, navigate]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex flex-col h-screen bg-background">
        <Header />
        <main className="flex overflow-hidden h-full">
          <div className="container mx-auto py-8 h-full">
            <div className="flex items-center justify-center h-full">
              <p>Loading...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // If no data, this shouldn't happen due to the navigate above, but just in case
  if (!shareData) {
    return null;
  }

  // Update document title and meta tags
  useEffect(() => {
    if (shareData) {
      document.title = shareData.title;

      // Update meta description
      const metaDescription = document.querySelector(
        'meta[name="description"]',
      );
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          shareData.description || "Watch on Video AI Studio",
        );
      }

      // You could add more meta tags here for Open Graph, Twitter, etc.
    }
  }, [shareData]);

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <main className="flex overflow-hidden h-full">
        <div className="container mx-auto py-8 h-full">
          <div className="flex flex-col gap-8 items-center justify-center h-full">
            <h1 className="font-semibold text-2xl">{shareData.title}</h1>
            <p className="text-muted-foreground max-w-3xl w-full sm:w-3xl text-center">
              {shareData.description}
            </p>
            <div className="max-w-4xl">
              <video
                src={shareData.videoUrl}
                poster={shareData.thumbnailUrl}
                controls
                className="w-full h-full aspect-video"
              >
                <track kind="captions" src="" label="English" />
              </video>
            </div>
            <div className="flex flex-row gap-2 items-center justify-center">
              <Button variant="secondary" asChild size="lg">
                <a href={shareData.videoUrl} download>
                  <DownloadIcon className="w-4 h-4 opacity-50" />
                  Download
                </a>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <a href="/">Start your project</a>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
