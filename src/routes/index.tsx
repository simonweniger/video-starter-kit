import { useEffect, useState } from "react";
import { App } from "@/components/main";
import { PROJECT_PLACEHOLDER } from "@/data/schema";

export default function AppPage() {
  const [projectId, setProjectId] = useState<string>(PROJECT_PLACEHOLDER.id);

  useEffect(() => {
    // Get the lastProjectId from cookies on the client side
    const lastProjectId = document.cookie
      .split("; ")
      .find((row) => row.startsWith("__aivs_lastProjectId="))
      ?.split("=")[1];

    if (lastProjectId) {
      setProjectId(lastProjectId);
    }
  }, []);

  return <App projectId={projectId} />;
}
