import { google } from 'googleapis';

export async function downloadTextFile(fileId: string): Promise<string> {
    const auth = new google.auth.JWT({
        email: process.env.GOOGLE_CLIENT_EMAIL,
        key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'), 
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      });
  const drive = google.drive({ version: 'v3', auth });
  const res = await drive.files.get({
    fileId,
    alt: 'media'
  }, { responseType: 'text' });

  return res.data as string;
}
