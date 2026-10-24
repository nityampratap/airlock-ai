#!/usr/bin/env python3
"""
AIRLOCK AI — Independent Receipt Verifier CLI
Portable, standalone tool to independently verify Ed25519-signed evaluation receipts.

Usage:
    python cli_verifier.py <path_to_receipt.json>
    python cli_verifier.py <path_to_receipt.json> --tamper
"""

import sys
import json
import hashlib
from typing import Dict, Any, Tuple
from cryptography.hazmat.primitives.asymmetric import ed25519

def canonical_json(data: Any) -> str:
    return json.dumps(data, sort_keys=True, separators=(',', ':'), ensure_ascii=True)

def compute_event_hash(previous_hash: str, event_data: Dict[str, Any]) -> str:
    canonical_str = canonical_json(event_data)
    message = (previous_hash + canonical_str).encode('utf-8')
    return hashlib.sha256(message).hexdigest()

def verify_receipt(receipt: Dict[str, Any]) -> Tuple[bool, str, Dict[str, Any]]:
    events = receipt.get("events", [])
    claimed_root = receipt.get("root_hash", "")
    signature_hex = receipt.get("signature_hex", "")
    public_key_hex = receipt.get("public_key_hex", "")

    if not events:
        return False, "Receipt has no audit events.", {}
    if not claimed_root or not signature_hex or not public_key_hex:
        return False, "Missing critical cryptographic proof fields.", {}

    running_hash = "0" * 64
    chain_log = []

    for idx, ev in enumerate(events, start=1):
        prev = ev.get("previous_hash")
        curr = ev.get("current_hash")
        payload = ev.get("payload_data")
        
        if prev != running_hash:
            return False, f"Broken chain link at index #{idx}: expected {running_hash[:12]}..., got {prev[:12]}...", {}
        
        recomputed = compute_event_hash(running_hash, payload)
        if recomputed != curr:
            return False, f"Tampered event payload at index #{idx} ({ev.get('event_type')}): expected hash {recomputed[:12]}..., recorded {curr[:12]}...", {}

        chain_log.append({
            "seq": idx,
            "type": ev.get("event_type"),
            "hash": curr[:16] + "..."
        })
        running_hash = recomputed

    if running_hash != claimed_root:
        return False, f"Root hash mismatch: chain yields {running_hash}, receipt claimed {claimed_root}.", {}

    # Verify Ed25519 signature
    try:
        pub_key_bytes = bytes.fromhex(public_key_hex)
        pub_key = ed25519.Ed25519PublicKey.from_public_bytes(pub_key_bytes)
        sig_bytes = bytes.fromhex(signature_hex)
        pub_key.verify(sig_bytes, claimed_root.encode('utf-8'))
    except Exception as e:
        return False, f"Ed25519 digital signature validation failed: {str(e)}", {}

    details = {
        "evaluation_id": receipt.get("evaluation_id"),
        "project": receipt.get("project_name"),
        "algorithm": receipt.get("algorithm"),
        "root_hash": claimed_root,
        "public_key": public_key_hex[:24] + "...",
        "total_events": len(events),
        "chain_summary": chain_log
    }
    return True, "SUCCESS: Cryptographic hash chain and Ed25519 digital signature are valid and untampered.", details

def main():
    if len(sys.argv) < 2:
        print("Usage: python cli_verifier.py <receipt_file.json> [--tamper]")
        sys.exit(1)

    file_path = sys.argv[1]
    tamper_mode = "--tamper" in sys.argv

    try:
        with open(file_path, "r", encoding="utf-8") as f:
            receipt = json.load(f)
    except Exception as e:
        print(f"[!] Error loading receipt JSON: {e}")
        sys.exit(1)

    if tamper_mode:
        print(">>> INJECTING SIMULATED TAMPERING INTO RECEIPT EVENT PAYLOAD <<<")
        if receipt.get("events") and len(receipt["events"]) > 0:
            receipt["events"][0]["payload_data"]["tampered_injected_field"] = "MALICIOUS_MODIFICATION_TEST"

    print("\n=======================================================")
    print("           AIRLOCK AI INDEPENDENT VERIFIER            ")
    print("=======================================================")
    print(f"Target Receipt : {file_path}")
    print(f"Evaluation ID  : {receipt.get('evaluation_id', 'N/A')}")
    print(f"Algorithm      : {receipt.get('algorithm', 'Ed25519-SHA256')}")
    print("-------------------------------------------------------")

    is_valid, message, details = verify_receipt(receipt)

    if is_valid:
        print(f"[+] STATUS: VALID (PASS)")
        print(f"[+] Root Digest : {details['root_hash']}")
        print(f"[+] Signer PubKey: {details['public_key']}")
        print(f"[+] Total Events : {details['total_events']}")
        
        # ThreatLoop Provenance (if present)
        tl_meta = receipt.get("threatloop_evidence")
        if tl_meta:
            print("-------------------------------------------------------")
            print("AIRLOCK THREATLOOP PROVENANCE EVIDENCE:")
            print(f"  * TinyFish Task ID : {tl_meta.get('tinyfish_task_id')}")
            print(f"  * Public Source URL: {tl_meta.get('source_url')}")
            print(f"  * Finding ID       : {tl_meta.get('finding_id')}")
            print(f"  * Safe Template    : {tl_meta.get('template_id')} (v{tl_meta.get('template_version')})")
            print(f"  * Policy Decision  : {tl_meta.get('policy_enforcement_decision')}")
            if tl_meta.get('browser_observed_response'):
                print(f"  * Browser Response : {tl_meta.get('browser_observed_response')[:80]}...")
            print("-------------------------------------------------------")

        print("\nChain Progression:")
        for step in details["chain_summary"]:
            print(f"  #{step['seq']:02d} [{step['type']:<26}] -> {step['hash']}")
        print(f"\nResult: {message}")
        print("=======================================================\n")
        sys.exit(0)
    else:
        print(f"[-] STATUS: TAMPER DETECTED / INVALID (FAIL)")
        print(f"[-] Reason: {message}")
        print("=======================================================\n")
        sys.exit(2)

if __name__ == "__main__":
    main()
