import { google } from "googleapis";
import { Readable } from "stream";

const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

async function getDriveService() {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

    if (!email || !key) {
        throw new Error("Missing Google Drive Service Account credentials in .env.local");
    }

    // Robustly handle the private key from .env
    // It might be double-quoted, have literal \n, or escaped \n
    let cleanKey = key.trim();
    if (cleanKey.startsWith('"') && cleanKey.endsWith('"')) {
        cleanKey = cleanKey.slice(1, -1);
    }
    cleanKey = cleanKey.replace(/\\n/g, "\n");

    const auth = new google.auth.JWT({
        email,
        key: cleanKey,
        scopes: SCOPES,
    });

    return google.drive({ version: "v3", auth });
}

export async function uploadToDrive(file: File, folderId: string) {
    try {
        const drive = await getDriveService();
        
        // Convert File to Buffer/Stream
        const buffer = Buffer.from(await file.arrayBuffer());
        const stream = new Readable();
        stream.push(buffer);
        stream.push(null);

        const response = await drive.files.create({
            requestBody: {
                name: file.name,
                parents: [folderId],
            },
            media: {
                mimeType: file.type,
                body: stream,
            },
            fields: "id, webViewLink, webContentLink",
        });

        // Make file public
        await drive.permissions.create({
            fileId: response.data.id!,
            requestBody: {
                role: "reader",
                type: "anyone",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Google Drive Upload Error:", error);
        throw error;
    }
}
