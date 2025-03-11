/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as download from "../download.js";
import type * as fal from "../fal.js";
import type * as files from "../files.js";
import type * as http from "../http.js";
import type * as share from "../share.js";
import type * as uploadthing from "../uploadthing.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  download: typeof download;
  fal: typeof fal;
  files: typeof files;
  http: typeof http;
  share: typeof share;
  uploadthing: typeof uploadthing;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
