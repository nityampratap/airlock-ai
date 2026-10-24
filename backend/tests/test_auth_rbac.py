import pytest
from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.core.init_db import init_db

@pytest.fixture(scope="module", autouse=True)
def setup_db():
    init_db()

def test_health_endpoint():
    with TestClient(app) as client:
        response = client.get("/api/v1/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "crypto_key_fingerprint" in data

def test_login_demo_user():
    with TestClient(app) as client:
        response = client.post("/api/v1/auth/login", json={
            "email": "secops@airlock.ai",
            "password": "AirlockSec2026!"
        })
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert len(data["organizations"]) >= 1
        assert data["user"]["email"] == "secops@airlock.ai"

def test_invalid_login():
    with TestClient(app) as client:
        response = client.post("/api/v1/auth/login", json={
            "email": "secops@airlock.ai",
            "password": "WrongPassword123"
        })
        assert response.status_code == 401

def test_register_new_tenant():
    import uuid
    with TestClient(app) as client:
        email = f"marcus_{uuid.uuid4().hex[:6]}@ai-assurance.org"
        response = client.post("/api/v1/auth/register", json={
            "email": email,
            "password": "SecurePassword2026!",
            "full_name": "Dr. Marcus Brody",
            "organization_name": "Safety Research Institute"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["user"]["email"] == email
        assert len(data["organizations"]) == 1
        assert data["organizations"][0]["name"] == "Safety Research Institute"
