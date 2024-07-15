const API_BASE_URL = 'http://localhost:3000'; 

async function register(userData) {
  try {
    console.log(userData);
    const response = await fetch(`${API_BASE_URL}/auth/register`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Registration failed');
  }
}

export default { register };
