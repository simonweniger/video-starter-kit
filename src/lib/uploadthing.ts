import {
  generateReactHelpers,
  generateUploadDropzone,
} from "@uploadthing/react";

import type { OurFileRouter } from "@/server/api/uploadthing";

export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
