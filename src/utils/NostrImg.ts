export interface UploadResult {
  url?: string;
  error?: string;
}

/**
* Upload file to void.cat
* https://void.cat/swagger/index.html
*/

export default async function VoidCat(file: File ): Promise<UploadResult> {
  const buf = await file.arrayBuffer();

  const req = await fetch("https://void.cat/upload", {
    body: buf,
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
      "V-Content-Type": file.type, // Extracting the mime type
      "V-Filename": file.name, // Extracting the filename
      "V-Description": "Upload from https://confesstr.lol",
    },
  });
  if (req.ok) {
      let rsp: VoidUploadResponse = await req.json();
      const fileExtension = file.name.split('.').pop(); // Extracting the file extension
      const resultUrl = `https://void.cat/d/${rsp.file?.id}.${fileExtension}`;
      return {url: resultUrl};
  }
  return {
    error: "Upload failed",
  };
}

export interface UploadResult {
url?: string;
error?: string;
}

export type VoidUploadResponse = {
  ok: boolean,
  file?: VoidFile,
  errorMessage?: string,
}

export type VoidFile = {
  id: string,
  meta?: VoidFileMeta
}

export type VoidFileMeta = {
  version: number,
  id: string,
  name?: string,
  size: number,
  uploaded: Date,
  description?: string,
  mimeType?: string,
  digest?: string,
  url?: string,
  expires?: Date,
  storage?: string,
  encryptionParams?: string,
}