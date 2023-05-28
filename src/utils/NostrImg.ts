export interface UploadResult {
    url?: string;
    error?: string;
  }

export default async function NostrImg(file: File | Blob): Promise<UploadResult> {
    const fd = new FormData();
    fd.append("image", file);
  
    const rsp = await fetch("https://nostrimg.com/api/upload", {
      body: fd,
      method: "POST",
      headers: {
        accept: "application/json",
      },
    });
    if (rsp.ok) {
      const data: UploadResponse = await rsp.json();
      if (typeof data?.imageUrl === "string" && data.success) {
        return {
          url: new URL(data.imageUrl).toString(),
        };
      }
    }
    return {
      error: "Upload failed",
    };
  }
  
  interface UploadResponse {
    fileID?: string;
    fileName?: string;
    imageUrl?: string;
    lightningDestination?: string;
    lightningPaymentLink?: string;
    message?: string;
    route?: string;
    status: number;
    success: boolean;
    url?: string;
    data?: {
      url?: string;
    };
  }