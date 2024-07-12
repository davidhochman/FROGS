const API_BASE_URL = 'http://localhost:3000'; // Update with your backend port

export async function fetchUsers() {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);

    if (!response.ok) {
      // Attempt to get more details from the response
      const errorData = await response.json().catch(() => ({})); 
      const errorMessage = errorData.error || `Server responded with status: ${response.status}`;
      throw new Error(errorMessage); 
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchUsers:", error);
    throw error;  
  }
}