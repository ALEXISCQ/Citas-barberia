from pathlib import Path

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


BACKEND_ROOT = Path(__file__).resolve().parents[2]


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=BACKEND_ROOT / '.env',
        env_file_encoding='utf-8',
        case_sensitive=False,
        extra='ignore',
    )

    mongodb_uri: str = Field(default='mongodb://127.0.0.1:27017/citas-barberia', validation_alias='MONGODB_URI')
    port: int = Field(default=3001, validation_alias='PORT')
    database_name: str = 'citas-barberia'
    collection_name: str = 'citas'


settings = Settings()
