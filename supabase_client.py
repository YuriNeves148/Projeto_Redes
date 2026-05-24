import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

url: str = os.environ.get("URLsupabase")
key: str = os.environ.get("KEYsupabase")

supabase: Client = create_client(url, key)