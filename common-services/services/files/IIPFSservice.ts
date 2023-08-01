export interface IIPFSservice {
  uploadToIPFS(file: string): Promise<string>;
}
