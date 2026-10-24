import os
import secrets
from pathlib import Path
from pydantic_settings import BaseSettings

BASE_DIR = Path(__file__).resolve().parent.parent.parent

def _get_secret_key() -> str:
    """Get SECRET_KEY from environment. Generate a random one for development only."""
    key = os.getenv("SECRET_KEY", "")
    if not key:
        # Auto-generate for local development; in production, always set SECRET_KEY env var
        key = secrets.token_urlsafe(64)
        print("[WARNING] SECRET_KEY not set — generated ephemeral key. Set SECRET_KEY env var for production.")
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
