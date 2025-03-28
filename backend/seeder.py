from database import SessionLocal, engine
from models import Base, User  # Asegúrate de importar Base y User

# Crear las tablas en la base de datos
Base.metadata.create_all(bind=engine)

# Abrir una sesión de la base de datos
db = SessionLocal()

usuarios = [
    {"nombre": "Profesor Juan", "username": "juan123", "email": "juan@mail.com", "password": "123456", "tipo": "maestro"},
    {"nombre": "Alumno Pedro", "username": "pedro123", "email": "pedro@mail.com", "password": "123456", "tipo": "alumno"},
]

# Insertar usuarios si no existen
for usuario in usuarios:
    existe = db.query(User).filter(User.username == usuario["username"]).first()
    if not existe:
        db.add(User(**usuario))

# Guardar cambios y cerrar sesión
db.commit()
db.close()

print("Usuarios insertados correctamente.")
