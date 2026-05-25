import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    mongodb_uri: str = os.getenv('MONGODB_URI', 'mongodb://127.0.0.1:27017/citas-barberia')
    port: int = int(os.getenv('PORT', 3001))
    database_name: str = 'citas-barberia'
    collection_name: str = 'citas'

    class Config:
        env_file = '.env'
        case_sensitive = False


settings = Settings()
