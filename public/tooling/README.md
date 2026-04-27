# Quickbase Mock Server Setup Guide

This guide walks through how to run a local mock of the Quickbase API so you can develop and test PO check-in workflows without needing a real Quickbase account.

## How It Works

The mock server is a standalone FastAPI app that mimics Quickbase's native `/v1` API endpoints. Your backend's `QuickbaseRepository` talks to it exactly as it would talk to the real Quickbase API — field-ID-keyed requests and responses, `where` clause filtering, and all. No backend or frontend code changes are needed beyond configuration.


## 1. Environment Variables

Add or update the following in your `.env` file:

```env
# Point the backend at the mock server running on your host machine.
# Use host.docker.internal because the backend runs inside Docker
# and "localhost" would refer to the container itself.
QUICKBASE_URL=http://host.docker.internal:8100/v1

# Table IDs — these just need to match between your .env and the mock server.
# The values are arbitrary; they're only used to route queries to the right mock table.
PO_TABLE_ID=po_table
PO_LINE_ITEMS_TABLE_ID=li_table
RECEIPTS_TABLE_ID=receipts_table

# Must be non-empty or httpx will reject the auth header.
# The mock server ignores these values entirely.
QUICKBASE_API_TOKEN=mock-token
QB_REALM_HOSTNAME=mock.quickbase.com

# Enables the receipt creation flow. Without this, the service layer
# returns None on receipt creation which causes a validation error.
WRITE_TO_QUICKBASE=true

# Remove this line from your .env entirely, or set it to a mock PO number.
# If set to an empty string, Pydantic may parse it as "" instead of None,
# which will block writes to any PO that doesn't match.
# Option A: Remove the line entirely (allows writes to all mock POs)
# Option B: Set to a specific mock PO number
TEST_PO_NUMBER=50002
```

## 2. Customizing Seed Data

The mock POs and line items are defined as Python constants at the top of the file (`SEED_POS`, `SEED_LINE_ITEMS`). Edit these to match whatever test scenarios you need. The table ID constants (`PO_TABLE_ID`, `LINE_ITEMS_TABLE_ID`, `RECEIPTS_TABLE_ID`) must match your `.env` values.

## 3. Running

Start the mock server (from your host machine, not inside Docker):

```bash
pip install fastapi uvicorn  # if not already installed
python harbor_qb_mock.py
```

You should see:

```
Quickbase Mock Server (Native API Format)
Running on http://localhost:8100
Swagger docs at http://localhost:8100/docs
```

Then restart your Docker containers so the backend picks up the new `.env` values:

```bash
make up
```

## 4. Verifying It Works

Check the backend logs for `200 OK` responses on the Quickbase routes:

```bash
docker logs via_wms_backend
```

You should see lines like:

```
GET /api/qb/incomplete-purchase-orders/ HTTP/1.1" 200 OK
GET /api/qb/purchase-order/50002 HTTP/1.1" 200 OK
```

If you see `502 Bad Gateway` or connection errors, verify:
- The mock server is running on your host machine
- Your `.env` uses `host.docker.internal` (not `localhost`)
- The Docker container was fully restarted (not just a hot reload)

## 5. Utility Endpoints

The mock server includes a couple of dev-only endpoints:

| Endpoint | Method | Description |
|---|---|---|
| `/mock/status` | GET | Overview of current mock state (PO counts, line items) |
| `/mock/reset` | POST | Reset all data back to seed values (undoes any receipts) |
| `/docs` | GET | Swagger UI for exploring all endpoints |

## Notes

- The mock is **stateful in-memory** — creating receipts actually increments `received_quantity` on line items, so the full check-in flow works end to end. Restarting the mock server resets everything.
- Part number lookups from PO line items (e.g. `VIA-BOLT-M6X20`) will 422 if those parts don't exist in your local database. This is expected — just use the manual part selection fallback on the line item card.
- The `422 Unprocessable Content` errors on `/api/parts/part-number/*` are harmless — the frontend handles the fallback gracefully.