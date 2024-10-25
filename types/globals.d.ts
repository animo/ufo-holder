declare namespace crypto {
  function getRandomValues<T extends Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array>(
    input: T
  ): T
}
