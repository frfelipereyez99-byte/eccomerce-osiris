from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMmiddleware
from pydantic import BaseModel
from typing import List, Optional
import mercadopago

app = FastAPI()

# Permitir solicitudes desde tu HTML/JS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Reemplaza por tu Access Token de Mercado Pago
MERCADOPAGO_ACCESS_TOKEN = "TEST-0000000000000000-000000-00000000000000000000000000000000-00000000"

sdk = mercadopago.SDK(MERCADOPAGO_ACCESS_TOKEN)

class Item(BaseModel):
    id: str
    name: str
    price: float
    quantity: int
    image: Optional[str] = None

class Payer(BaseModel):
    name: str
    email: str
    phone: str
    city: str
    address: str

class CheckoutPayload(BaseModel):
    items: List[Item]
    payer: Payer

@app.post("/create-preference")
def create_preference(payload: CheckoutPayload):
    try:
        items_mp = []
        for item in payload.items:
            items_mp.append({
                "id": item.id,
                "title": item.name,
                "quantity": int(item.quantity),
                "unit_price": float(item.price),
                "currency_id": "COP",
                "picture_url": item.image if item.image else ""
            })

        preference_data = {
            "items": items_mp,
            "payer": {
                "name": payload.payer.name,
                "email": payload.payer.email,
                "phone": {"number": payload.payer.phone},
                "address": {"street_name": f"{payload.payer.address}, {payload.payer.city}"}
            },
            "back_urls": {
                "success": "http://127.0.0.1:5500/index.html",
                "failure": "http://127.0.0.1:5500/index.html",
                "pending": "http://127.0.0.1:5500/index.html"
            },
            "auto_return": "approved"
        }

        preference_response = sdk.preference().create(preference_data)
        preference = preference_response["response"]

        return {
            "init_point": preference.get("init_point"),
            "sandbox_init_point": preference.get("sandbox_init_point")
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))