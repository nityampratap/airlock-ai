import os
import secrets
from pathlib import Path
from dotenv import load_dotenv
from pydantic_settings import BaseSettings

# Resolve both backend dir and workspace root dir
BASE_DIR = Path(__file__).resolve().parent.parent.parent
ROOT_DIR = BASE_DIR.parent

# Load .env from workspace root first, then backend dir if present
load_dotenv(ROOT_DIR / ".env")
load_dotenv(BASE_DIR / ".env")

def _get_secret_key() -> str:
    """Get SECRET_KEY from environment. Use fixed development fallback if not set."""
    key = os.getenv("SECRET_KEY", "").strip()
    if not key or "change-this" in key:
        # Fixed stable dev secret to prevent session invalidation on restart
        key = "airlock-dev-fixed-secret-key-evaluation-assurance-platform-2026-xyz"
    return key

class Settings(BaseSettings):
    PROJECT_NAME: str = "AIRLOCK AI"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    DEBUG: bool = os.getenv("DEBUG", "true").lower() in ("true", "1", "yes")
    
    # Security & JWT
    SECRET_KEY: str = _get_secret_key()
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("TOKEN_EXPIRE_MINUTES", "1440"))  # 24 hours
    
    # Cryptographic Evidence Seal (Ed25519)
    KEYS_DIR: Path = BASE_DIR / "keys"
    ED25519_PRIVATE_KEY_PATH: Path = BASE_DIR / "keys" / "ed25519_private.pem"
    ED25519_PUBLIC_KEY_PATH: Path = BASE_DIR / "keys" / "ed25519_public.pem"
    
    # Database
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        f"sqlite:///{BASE_DIR / 'airlock_ai.db'}"
    )
    
    # CORS — use CORS_ORIGINS env var (comma-separated) in production
    BACKEND_CORS_ORIGINS: list[str] = [
        origin.strip()
        for origin in os.getenv(
            "CORS_ORIGINS",
            "http://localhost:3000,http://127.0.0.1:3000,http://localhost:8000,http://127.0.0.1:8000,http://localhost:8005,http://127.0.0.1:8005"
        ).split(",")
    ]
    
    # TinyFish Web Intelligence (Safe Research & Web Agent API)
    TINYFISH_API_KEY: str = os.getenv("TINYFISH_API_KEY", "")
    TINYFISH_API_BASE: str = os.getenv("TINYFISH_API_BASE", "https://agent.tinyfish.ai/v1")
    TINYFISH_AGENT_ENDPOINT: str = os.getenv(
        "TINYFISH_AGENT_ENDPOINT",
        "https://agent.tinyfish.ai/v1/automation/run-sse"
    )
    TINYFISH_AGENT_RUN_ENDPOINT: str = os.getenv(
        "TINYFISH_AGENT_RUN_ENDPOINT",
        "https://agent.tinyfish.ai/v1/automation/run"
    )
    
    # Authorized Staging Web Target
    STAGING_APP_URL: str = os.getenv("STAGING_APP_URL", "http://localhost:3000/staging/agent-chat")
    
    # Commercial Billing (Stripe) — must be set via env vars
    STRIPE_API_KEY: str = os.getenv("STRIPE_API_KEY", "")
    STRIPE_WEBHOOK_SECRET: str = os.getenv("STRIPE_WEBHOOK_SECRET", "")

    class Config:
        case_sensitive = True

settings = Settings()
