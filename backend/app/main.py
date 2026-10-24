from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.core.config import settings
from backend.app.core.init_db import init_db
from backend.app.api.endpoints import api_router

# Ensure DB tables and migrations are applied on load
init_db()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: initialize database tables & deterministic demo fixtures
    init_db()
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="AIRLOCK AI — Enterprise AI Security Evaluation Assurance & Cryptographic Audit Broker API",
    openapi_url=f"{settings.API_V1_STR}/openapi.json" if settings.DEBUG else None,
    docs_url=f"{settings.API_V1_STR}/docs" if settings.DEBUG else None,
    redoc_url=f"{settings.API_V1_STR}/redoc" if settings.DEBUG else None,
    lifespan=lifespan
)

# CORS — restrict to configured origins only
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)

# Mount API
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "product": "AIRLOCK AI",
        "tagline": "Prove the test. Then trust the result.",
        "api_docs": f"{settings.API_V1_STR}/docs" if settings.DEBUG else "disabled",
        "status": "OPERATIONAL"
    }

