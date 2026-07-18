import type { ImageMetadata } from "astro";

export interface ImageSource {
  avif: ImageMetadata;
  webp: ImageMetadata;
  alt: string;
}
