from fastapi import FastAPI, HTTPException, Depends, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from supabase import create_client, Client
from dotenv import load_dotenv
import uuid
from datetime import datetime

load_dotenv()

app = FastAPI()

# Supabase Setup
url: str = os.environ.get("SUPABASE_URL", "")
key: str = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or os.environ.get("SUPABASE_KEY", "")
supabase: Client = create_client(url, key)

# Allow CORS for Netlify and local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Product(BaseModel):
    id: Optional[str] = None
    name: str
    description: Optional[str] = None
    imageUrl: str
    isNewArrival: bool = False
    createdAt: Optional[str] = None

class LoginRequest(BaseModel):
    username: str
    password: str

@app.get("/")
async def root():
    return {"message": "Welcome to TOYS STORE Supabase API"}

@app.get("/products", response_model=List[Product])
async def get_products():
    try:
        response = supabase.table("toys").select("*").order("createdAt", desc=True).execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/products", response_model=Product)
async def create_product(product: Product):
    try:
        data = product.dict()
        if not data.get("id"):
            data["id"] = str(uuid.uuid4())
        data["createdAt"] = datetime.now().isoformat()
        
        response = supabase.table("toys").insert(data).execute()
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/products/{product_id}")
async def delete_product(product_id: str):
    try:
        supabase.table("toys").delete().eq("id", product_id).execute()
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    try:
        file_ext = file.filename.split(".")[-1]
        file_name = f"{uuid.uuid4()}.{file_ext}"
        file_content = await file.read()
        
        # Upload to Supabase Storage (Bucket: 'toy-images')
        # Note: Make sure the bucket is public
        res = supabase.storage.from_("toy-images").upload(file_name, file_content)
        
        # Get Public URL
        public_url = supabase.storage.from_("toy-images").get_public_url(file_name)
        return {"imageUrl": public_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/login")
async def login(req: LoginRequest):
    if req.username == "admin" and req.password == "password123":
        return {"success": True, "token": "mock-token-123"}
    raise HTTPException(status_code=401, detail="Invalid credentials")
