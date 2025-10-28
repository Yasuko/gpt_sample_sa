/**
 * Resize an image File to the given canvas size while preserving aspect ratio.
 * The image is scaled to fit entirely within the target canvas (letterboxed if needed),
 * using the longer side as the baseline and centering it.
 *
 * Inputs:
 * - inputFile: File - source image file (png/jpeg/webp/etc.)
 * - size: string | { width: number; height: number } - target canvas size in CSS pixels.
 *   When string, use format like "1280x780" (also accepts "1280X780" or "1280×780").
 * - opts: optional settings
 *   - mimeType?: string - output mime type (defaults to input file type or 'image/png')
 *   - quality?: number - output quality (0..1) for lossy formats like image/jpeg/webp
 *   - fileName?: string - output file name; defaults to original name with suffix
 *   - background?: string - background fill color before drawing (useful for JPEG)
 *
 * Output:
 * - Promise<File> - resized image as a new File
 */

export type ResizeSize = { width: number; height: number };
export type ResizeSizeInput = ResizeSize | string; // e.g. "1280x780"

export type ResizeOptions = {
  mimeType?: string;
  quality?: number; // 0..1
  fileName?: string;
  background?: string; // e.g., '#fff' for JPEG to avoid black transparency
};

// Overloads to support string size input
export async function resizeImageFile(inputFile: File, size: string, opts?: ResizeOptions): Promise<File>;
export async function resizeImageFile(inputFile: File, size: ResizeSize, opts?: ResizeOptions): Promise<File>;
export async function resizeImageFile(
  inputFile: File,
  size: ResizeSizeInput,
  opts: ResizeOptions = {}
): Promise<File> {
  if (!(inputFile instanceof File)) {
    throw new TypeError("inputFile must be a File");
  }
  const { width: targetW, height: targetH } =
    typeof size === "string" ? parseResizeSize(size) : size;
  if (!Number.isFinite(targetW) || !Number.isFinite(targetH) || targetW <= 0 || targetH <= 0) {
    throw new RangeError("Invalid target size: width and height must be positive numbers");
  }

  const sourceBitmap = await loadImageBitmap(inputFile);
  const srcW = sourceBitmap.width;
  const srcH = sourceBitmap.height;
  if (!srcW || !srcH) {
    sourceBitmap.close?.();
    throw new Error("Failed to read image dimensions");
  }

  // Compute scale to fit inside target canvas while preserving aspect ratio
  const scale = Math.min(targetW / srcW, targetH / srcH);
  const drawW = Math.max(1, Math.round(srcW * scale));
  const drawH = Math.max(1, Math.round(srcH * scale));
  const dx = Math.floor((targetW - drawW) / 2);
  const dy = Math.floor((targetH - drawH) / 2);

  // Prepare canvas
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(targetW);
  canvas.height = Math.round(targetH);
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    sourceBitmap.close?.();
    throw new Error("Failed to get 2D context");
  }

  // Fill background if requested or if exporting to a format without alpha (e.g., JPEG)
  const mimeType = opts.mimeType || inputFile.type || "image/png";
  const needsOpaqueBg = mimeType.toLowerCase() === "image/jpeg" || mimeType.toLowerCase() === "image/jpg";
  const bg = opts.background ?? (needsOpaqueBg ? "#ffffff" : undefined);
  if (bg) {
    ctx.save();
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  } else {
    // Ensure canvas is cleared (transparent background)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // Use high-quality scaling
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // Draw centered
  ctx.drawImage(sourceBitmap, dx, dy, drawW, drawH);

  // Convert canvas to Blob and then to File
  const quality = clampQuality(opts.quality);
  const blob = await canvasToBlob(canvas, mimeType, quality);

  // Cleanup image bitmap
  sourceBitmap.close?.();

  const outName = buildOutputFileName(inputFile.name, mimeType, opts.fileName);
  const outFile = new File([blob], outName, { type: blob.type, lastModified: Date.now() });
  return outFile;
}

// Helpers

/**
 * Parse size string like "1280x780" (also accepts X or ×) into { width, height }.
 */
export function parseResizeSize(input: string): ResizeSize {
  if (typeof input !== "string") {
    throw new TypeError("size must be a string like '1280x780'");
  }
  const s = input.trim();
  // Accept separators: x, X, or multiplication sign ×
  const m = s.match(/^(\d+)\s*[xX×]\s*(\d+)$/);
  if (!m) {
    throw new RangeError("Invalid size format. Expected 'WIDTHxHEIGHT', e.g., '1280x720'.");
  }
  const width = Number(m[1]);
  const height = Number(m[2]);
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    throw new RangeError("Invalid size numbers: width and height must be positive integers");
  }
  return { width, height };
}

function clampQuality(q?: number): number | undefined {
  if (q == null) return undefined;
  if (Number.isNaN(q)) return undefined;
  return Math.min(1, Math.max(0, q));
}

async function loadImageBitmap(file: File): Promise<ImageBitmap> {
  if ("createImageBitmap" in window && typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(file);
    } catch {
      // Fallback to HTMLImageElement pipeline
    }
  }
  const img = await loadHTMLImage(file);
  try {
    // Convert to ImageBitmap for faster draw if possible
    if ("createImageBitmap" in window && typeof createImageBitmap === "function") {
      const bmp = await createImageBitmap(img);
      return bmp;
    }
  } catch {
    // Ignore and draw using <img> via canvas drawImage which accepts CanvasImageSource
  }
  // TypeScript: HTMLImageElement is acceptable as CanvasImageSource, but our return type is ImageBitmap.
  // To keep API uniform, we draw directly with the image in the caller when bitmap isn't available.
  // For simplicity here, we re-implement draw using ImageBitmap path by creating an offscreen canvas.
  // However, to keep the signature, we convert to ImageBitmap from the img's bitmap renderer via canvas.
  const off = document.createElement("canvas");
  off.width = img.naturalWidth || img.width;
  off.height = img.naturalHeight || img.height;
  const octx = off.getContext("2d");
  if (!octx) throw new Error("Failed to get 2D context for offscreen");
  octx.drawImage(img, 0, 0);
  const blob = await canvasToBlob(off, file.type || "image/png");
  const bmp = await createImageBitmap(blob);
  return bmp;
}

function loadHTMLImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
    img.src = url;
    // Ensure anonymous crossOrigin to avoid taint when possible
    img.crossOrigin = "anonymous";
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    // Some browsers throw when type is unsupported; fallback to image/png
    const tryType = (t: string) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            if (t !== "image/png") {
              tryType("image/png");
              return;
            }
            reject(new Error("Canvas toBlob() returned null"));
            return;
          }
          resolve(blob);
        },
        t,
        quality
      );
    };
    tryType(type || "image/png");
  });
}

function buildOutputFileName(original: string, mimeType: string, override?: string): string {
  if (override) return override;
  const ext = extensionFromMime(mimeType) || extname(original) || "png";
  const base = basenameWithoutExt(original) || "image";
  return `${base}_resized.${ext}`;
}

function extensionFromMime(mime: string): string | undefined {
  const m = mime.toLowerCase();
  if (m === "image/jpeg" || m === "image/jpg") return "jpg";
  if (m === "image/png") return "png";
  if (m === "image/webp") return "webp";
  if (m === "image/bmp") return "bmp";
  if (m === "image/gif") return "gif";
  if (m === "image/avif") return "avif";
  return undefined;
}

function basenameWithoutExt(name: string): string {
  const lastSlash = Math.max(name.lastIndexOf("/"), name.lastIndexOf("\\"));
  const base = lastSlash >= 0 ? name.slice(lastSlash + 1) : name;
  const dot = base.lastIndexOf(".");
  return dot >= 0 ? base.slice(0, dot) : base;
}

function extname(name: string): string | undefined {
  const dot = name.lastIndexOf(".");
  if (dot < 0) return undefined;
  return name.slice(dot + 1).toLowerCase();
}

export default resizeImageFile;
