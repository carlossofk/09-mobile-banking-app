export const generateDinHeader = () => ({
  device: 'device_value',
  language: 'en',
  uuid: 'random_uuid_value',
  ip: '192.168.1.1',
  transactionTime: new Date().toISOString(),
  symmetricalKey: 'key_value',
  initializationVector: 'vector_value',
});