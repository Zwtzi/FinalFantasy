export async function login(username, password) {
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
  
    if (!response.ok) {
      throw new Error("Login fallido. Verifique las credenciales.");
    }
  
    return response.json();  // Retorna el JSON de la respuesta (con "message" y "tipo")
  }
  