import NodeRSA from 'node-rsa';

export const decryptMessage = ({
  text,
  publicKey,
}: {
  text: string;
  publicKey: string;
}): string => {
  try {
    const rsa = new NodeRSA(publicKey);
    const plaintext = rsa.decrypt(text, 'utf8');
    return plaintext;
  } catch (e) {
    console.log(e);
    return 'enable to decrypt message';
  }
};
