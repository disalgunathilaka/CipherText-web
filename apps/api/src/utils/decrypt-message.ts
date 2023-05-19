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

export function encryptWithPrivateKey({
  text,
  privateKey,
}: {
  text: string;
  privateKey: string;
}): string {
  const rsa = new NodeRSA(privateKey);
  const ciphertext = rsa.encrypt(text, 'hex');
  return ciphertext.toString();
}
