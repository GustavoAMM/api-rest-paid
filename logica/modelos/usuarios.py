from typing import Optional
from sqlalchemy import String
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from logica.db import connect_to_db
# from logica.db import connect_to_db
from sqlalchemy.orm import Session


class Base(DeclarativeBase):
    pass


engine = connect_to_db("root", "root")
Base.metadata.create_all(engine)
session = Session(engine)


class Users(Base):

    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    nick_name: Mapped[str] = mapped_column(String(30))
    fullname: Mapped[Optional[str]]

    def __repr__(self) -> str:
        return f"User(id={self.id!r}, name={self.nick_name!r}, fullname={self.fullname!r})"
