import { Storage } from "aws-amplify";

export async function s3Upload(file: File) {
    const filename = `${Date.now()}-${file.name}`;
    try {
        const stored = await Storage.vault.put(filename, file, {
            contentType: file.type,
        });
        return stored.key;
    } catch (e) {
        return console.log(`ERROR FROM S3UPLOAD: ${e}`)
    }

}

export async function s3Delete(str: string) {
    try {
        const removed = await Storage.vault.remove(str);
        return removed;
    } catch (e) {
        return console.log(`ERROR FROM S3DELETE: ${e}`)
    }

}

