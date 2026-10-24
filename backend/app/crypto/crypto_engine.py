import json
import hashlib
from pathlib import Path
from typing import List, Dict, Any, Tuple
from cryptography.hazmat.primitives.asymmetric import ed25519
from cryptography.hazmat.primitives import serialization
from backend.app.core.config import settings

class CryptoEngine:
    def __init__(self, keys_dir: Path = settings.KEYS_DIR):
        self.keys_dir = Path(keys_dir)
        self.keys_dir.mkdir(parents=True, exist_ok=True)
        self.private_key_path = self.keys_dir / "ed25519_private.pem"
        self.public_key_path = self.keys_dir / "ed25519_public.pem"
        self._load_or_generate_keys()

    def _load_or_generate_keys(self):
        import os
        priv_env = os.getenv("ED25519_PRIVATE_KEY_PEM", "").strip()
        pub_env = os.getenv("ED25519_PUBLIC_KEY_PEM", "").strip()

        if priv_env and pub_env:
            self.private_key = serialization.load_pem_private_key(priv_env.encode("utf-8"), password=None)
            self.public_key = serialization.load_pem_public_key(pub_env.encode("utf-8"))
            return

        if self.private_key_path.exists() and self.public_key_path.exists():
            with open(self.private_key_path, "rb") as f:
                self.private_key = serialization.load_pem_private_key(f.read(), password=None)
            with open(self.public_key_path, "rb") as f:
                self.public_key = serialization.load_pem_public_key(f.read())
        else:
            self.private_key = ed25519.Ed25519PrivateKey.generate()
            self.public_key = self.private_key.public_key()
            
            # Save PEM
            priv_pem = self.private_key.private_bytes(
                encoding=serialization.Encoding.PEM,
                format=serialization.PrivateFormat.PKCS8,
                encryption_algorithm=serialization.NoEncryption()
            )
            pub_pem = self.public_key.public_bytes(
                encoding=serialization.Encoding.PEM,
                format=serialization.PublicFormat.SubjectPublicKeyInfo
            )
            with open(self.private_key_path, "wb") as f:
                f.write(priv_pem)
            with open(self.public_key_path, "wb") as f:
                f.write(pub_pem)
            if hasattr(os, "chmod"):
                try:
                    os.chmod(self.private_key_path, 0o600)
                except OSError:
                    pass

    @property
    def public_key_hex(self) -> str:
        raw_bytes = self.public_key.public_bytes(
            encoding=serialization.Encoding.Raw,
            format=serialization.PublicFormat.Raw
        )
        return raw_bytes.hex()

    @staticmethod
    def canonical_json(data: Any) -> str:
        """Returns deterministic canonical JSON string without whitespace, sorted keys."""
        return json.dumps(data, sort_keys=True, separators=(',', ':'), ensure_ascii=True)

    @staticmethod
    def compute_event_hash(previous_hash: str, event_data: Dict[str, Any]) -> str:
        """
        Computes SHA-256(previous_hash + canonical_json(event_data))
        """
        canonical_str = CryptoEngine.canonical_json(event_data)
        message = (previous_hash + canonical_str).encode('utf-8')
        return hashlib.sha256(message).hexdigest()

    def sign_root_hash(self, root_hash: str) -> str:
        """Signs the root hash using Ed25519 private key, returns hex-encoded signature."""
        sig = self.private_key.sign(root_hash.encode('utf-8'))
        return sig.hex()

    @staticmethod
    def verify_signature(public_key_hex: str, root_hash: str, signature_hex: str) -> bool:
        """Verifies Ed25519 signature given public key hex, root hash, and signature hex."""
        try:
            pub_key_bytes = bytes.fromhex(public_key_hex)
            pub_key = ed25519.Ed25519PublicKey.from_public_bytes(pub_key_bytes)
            sig_bytes = bytes.fromhex(signature_hex)
            pub_key.verify(sig_bytes, root_hash.encode('utf-8'))
            return True
        except Exception:
            return False

    @staticmethod
    def verify_receipt(receipt_data: Dict[str, Any]) -> Tuple[bool, str]:
        """
        Independently verifies an AIRLOCK AI Signed Receipt.
        Steps:
        1. Recalculates SHA-256 canonical hash chain across all audit events.
        2. Validates computed root hash matches receipt root hash.
        3. Validates Ed25519 signature against provided public key.
        Returns: (is_valid, message)
        """
        events = receipt_data.get("events", [])
        claimed_root = receipt_data.get("root_hash", "")
        signature_hex = receipt_data.get("signature_hex", "")
        public_key_hex = receipt_data.get("public_key_hex", "")

        if not events:
            return False, "Receipt contains no audit events."
        if not claimed_root or not signature_hex or not public_key_hex:
            return False, "Receipt missing required cryptographic verification fields."

        # Verify hash chain
        running_hash = "0" * 64
        for idx, event in enumerate(events, start=1):
            expected_prev = running_hash
            recorded_prev = event.get("previous_hash")
            if recorded_prev != expected_prev:
                return False, f"Event chain broken at sequence {idx}: expected previous hash {expected_prev}, got {recorded_prev}."

            event_payload = event.get("payload_data")
            computed_current = CryptoEngine.compute_event_hash(expected_prev, event_payload)
            recorded_current = event.get("current_hash")
            if computed_current != recorded_current:
                return False, f"Event tamper detected at sequence {idx}: hash mismatch. Computed {computed_current}, got {recorded_current}."

            running_hash = computed_current

        if running_hash != claimed_root:
            return False, f"Root hash mismatch: chain computed {running_hash}, but receipt claimed {claimed_root}."

        # Verify Ed25519 signature
        is_sig_valid = CryptoEngine.verify_signature(public_key_hex, claimed_root, signature_hex)
        if not is_sig_valid:
            return False, "Cryptographic signature invalid! The receipt root hash or signature has been modified."

        return True, "Cryptographic audit chain and Ed25519 signature VERIFIED VALID."

crypto_engine = CryptoEngine()
