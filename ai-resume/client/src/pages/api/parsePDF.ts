import pdf from 'pdf-parse';

export async function parsePDF(dataBuffer: Buffer): Promise<string> {
    const data = await pdf(dataBuffer);
    return data.text;
}
