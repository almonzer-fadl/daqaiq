async function createTestOrder() {
  try {
    const response = await fetch('http://localhost:3000/api/test/create-order', {
      method: 'POST',
    });
    
    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

createTestOrder(); 