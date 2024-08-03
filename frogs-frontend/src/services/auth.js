const API_BASE_URL = 'http://localhost:3000'; 

//Frontend function call to register a new user (customer)
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

//Frontend function call to register a new user (business)
async function registerbusiness(userID) {
  try {
    console.log(userID);
    const response = await fetch(`${API_BASE_URL}/auth/regbusiness`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userID: userID }), 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Business Registration failed'); 
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Business Registration failed'); 
  }
}

//Update function for business interface
async function update(formData, userID, busID) {
  console.log('fetching auth ');
  try {
    const response = await fetch(`${API_BASE_URL}/auth/update`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ updatedData: formData, userID, busID}),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Profile update failed');
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    throw new Error('Profile update failed'); 
  }
}

//Update function for customer interface
async function updateuser(formData, userID) {
  console.log('fetching auth ');
  try {
    const response = await fetch(`${API_BASE_URL}/auth/updateuser`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ updatedData: formData, userID}),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Profile update failed');
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    throw new Error('Profile update failed'); 
  }
}

//Login function call for backend authentication
async function login(username, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Login failed'); 
    }

    return response.json(); 
  } catch (error) {
    console.error('Error during login:', error);
    throw new Error('Login failed'); 
  }
}

//Retrieves a user object from the backend given a USERID
async function getuser(userID) {
  try {
    console.log(userID);
    const response = await fetch(`${API_BASE_URL}/auth/getuser`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userID: userID }), 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get user'); 
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to get user'); 
  }
}

//Retrieves a business object from the backend given a USERID
async function getbusiness(userID) {
  try {
    console.log(userID);
    const response = await fetch(`${API_BASE_URL}/auth/getbusiness`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userID: userID }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get business info'); 
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to get business info'); 
  }
}

//Retrieves all business appointments from backend given a BUSID
async function getapps(busID) {
  try {
    console.log(busID);
    const response = await fetch(`${API_BASE_URL}/auth/getapps`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ busID: busID }), 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get user'); 
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to get user'); 
  }
}

//Sends booking info to backend and uses BUSID to create a new booking
async function createbooking(formData, busID) {
  try {
    console.log(formData);
    const response = await fetch(`${API_BASE_URL}/auth/createbooking`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({data: formData, busID}),
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

//Sends updated booking info and uses APPID to alter an existing booking
async function updatebooking(formData, appID) {
  console.log('updating booking ');
  try {
    const response = await fetch(`${API_BASE_URL}/auth/updatebooking`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ updatedData: formData, appID}),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'booking update failed');
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    throw new Error('booking update failed'); 
  }
}

//Finds booking using APPID and deletes it 
async function deletebooking(appID) {
  try {
    console.log(appID);
    const response = await fetch(`${API_BASE_URL}/auth/deletebooking`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ appID: appID }), 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete booking'); 
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to delete booking'); 
  }
}

//Gets all reviews for a business corresponding to BUSID
async function getreviews(busID) {
  try {
    console.log(busID);
    const response = await fetch(`${API_BASE_URL}/auth/getreviews`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ busID: busID }), 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get reviews'); 
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to get reviews'); 
  }
}

//Business function to update their reply to a customers review
async function updatereview(reviewID, reply) {
  console.log('updating review ');
  try {
    const response = await fetch(`${API_BASE_URL}/auth/updatereview`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ updatedData: reviewID, reply}),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'review update failed');
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    throw new Error('review update failed'); 
  }
}

//Uses BUSID to get the corresponding businesses metrics data
async function getmetrics(busID) {
  try {
    console.log(busID);
    const response = await fetch(`${API_BASE_URL}/auth/getmetrics`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ busID: busID }), 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get metrics'); 
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to get metrics'); 
  }
}

//Retrieves all existing businesses
async function getbusinesses() {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/getbusinesses`, { 
      method: 'POST',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get business info'); 
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to get business info'); 
  }
}

//User function to book appointment with a business
async function bookappointment(appID, userID) {
  console.log('fetching auth ');
  try {
    const response = await fetch(`${API_BASE_URL}/auth/bookappointment`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ updatedData: appID, userID}),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Booking failed');
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    throw new Error('Booking failed');
  }
}

//Gets a specific users active appointments
async function getuserapps(userID) {
  try {
    console.log(userID);
    const response = await fetch(`${API_BASE_URL}/auth/getuserapps`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userID: userID }), 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get user'); 
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to get user'); 
  }
}

//Gets a businesses user info using its busid
async function getbusinessbusid(busID) {
  try {
    console.log(busID);
    const response = await fetch(`${API_BASE_URL}/auth/getbusinessbusid`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ busID: busID }), 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get business info'); 
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to get business info'); 
  }
}

//User function to cancel their appointment
async function cancelapp(userID) {
  console.log('fetching auth ');
  try {
    const response = await fetch(`${API_BASE_URL}/auth/cancelapp`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userID: userID}),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'delete failed');
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    throw new Error('delete failed'); 
  }
}

//User function to leave a review for a business
async function newreview(review, userID, busID, rating) {
  console.log('fetching auth ');
  try {
    const response = await fetch(`${API_BASE_URL}/auth/newreview`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newReview: review, userID, busID, rating}),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Profile update failed');
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    throw new Error('Profile update failed'); 
  }
}

//Retrieves all reviews that a user has made
async function getuserreviews(userID) {
  try {
    console.log(userID);
    const response = await fetch(`${API_BASE_URL}/auth/getuserreviews`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userID: userID }), 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get reviews'); 
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to get reviews'); 
  }
}



//Export functions
export default {register, registerbusiness, login, update, getuser, getbusiness,
   getapps, createbooking, updatebooking, deletebooking, getreviews, updatereview,
  getmetrics,updateuser, getbusinesses, bookappointment, getuserapps, getbusinessbusid,
  cancelapp, newreview, getuserreviews};
