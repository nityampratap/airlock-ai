import os
from pathlib import Path
from pydantic_settings import BaseSettings

BASE_DIR = Path(__file__).resolve().parent.parent.parent

class Settings(BaseSettings):
    PROJECT_NAME: str = "AIRLOCK AI"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Security & JWT
    SECRET_KEY: str = os.getenv("SECRET_KEY", "airlock-ai-prod-eval-assurance-sec-key-99214-alpha")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # Cryptographic Evidence Seal (Ed25519)
    KEYS_DIR: Path = BASE_DIR / "keys"
    ED25519_PRIVATE_KEY_PATH: Path = BASE_DIR / "keys" / "ed25519_private.pem"
    ED25519_PUBLIC_KEY_PATH: Path = BASE_DIR / "keys" / "ed25519_public.pem"
    
    # Database
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        f"sqlite:///{BASE_DIR / 'airlock_ai.db'}"
    )
    
    # CORS
    BACKEND_CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
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
    
    # Commercial Billing (Stripe test mode)
    STRIPE_API_KEY: str = os.getenv("STRIPE_API_KEY", "sk_test_airlock_mock_mode")
    STRIPE_WEBHOOK_SECRET: str = os.getenv("STRIPE_WEBHOOK_SECRET", "whsec_mock")

    class Config:
        case_sensitive = True

settings = Settings()
