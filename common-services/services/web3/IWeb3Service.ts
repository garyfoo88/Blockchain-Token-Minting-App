export interface IWeb3Service {
  signTransaction(ethAddress: string, tokenURI: string): Promise<any>;
}
