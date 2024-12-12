const url = import.meta.env.VITE_CREATE_ACC_URL;

// Typ för användardata
export interface UserData {
  username: string;
  email: string;
  password: string;
}

// Funktion för att skapa ett konto
export const createAccount = async (
  userData: UserData
): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create account: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating account:", error);
    throw error;
  }
};
