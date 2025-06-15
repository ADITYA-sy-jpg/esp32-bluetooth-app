let bluetoothDevice;
let characteristic;

async function connect() {
  try {
    bluetoothDevice = await navigator.bluetooth.requestDevice({
      filters: [{ namePrefix: 'ESP32' }],
      optionalServices: ['12345678-1234-1234-1234-123456789abc']
    });

    const server = await bluetoothDevice.gatt.connect();
    const service = await server.getPrimaryService('12345678-1234-1234-1234-123456789abc');
    characteristic = await service.getCharacteristic('abcd1234-5678-90ab-cdef-123456789abc');

    document.getElementById('status').innerText = 'Status: Connected!';
  } catch (error) {
    console.error('Bluetooth connection failed', error);
    document.getElementById('status').innerText = 'Status: Connection failed';
  }
}

async function sendData(data) {
  if (!characteristic) {
    alert("Please connect to the ESP32 first.");
    return;
  }

  const encoder = new TextEncoder();
  await characteristic.writeValue(encoder.encode(data));
}
