from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Base, User  # Asegúrate de importar Base
from pydantic import BaseModel

app = FastAPI()

# Crear la base de datos si no existe
Base.metadata.create_all(bind=engine)

# Dependencia de la sesión
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Esquema de validación
class LoginRequest(BaseModel):
    username: str
    password: str


# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todos los dominios (en producción, especifica el frontend)
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Permitir todos los encabezados
)

# Endpoint para login
@app.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == request.username).first()
    
    if not user or user.password != request.password:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

    return {"message": "Login exitoso", "tipo": user.tipo}
