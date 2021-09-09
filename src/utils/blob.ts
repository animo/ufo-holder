// https://stackoverflow.com/questions/68286332/axios-in-react-native-cannot-post-a-blob-or-file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Blob.prototype[Symbol.toStringTag] = 'Blob'

export async function localImageUrlToBlob(localImageUrl: string): Promise<Blob> {
  const image = await fetch(localImageUrl)

  const blob = await image.blob()

  return blob
}
