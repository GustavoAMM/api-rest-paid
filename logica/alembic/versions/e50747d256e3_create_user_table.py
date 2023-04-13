"""create user table

Revision ID: e50747d256e3
Revises: 
Create Date: 2023-02-28 18:32:34.321580

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e50747d256e3'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        'users',
        sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
        sa.Column('nick_name', sa.String(50), nullable=False),
        sa.Column('fullname', sa.Unicode(200)),
    )


def downgrade() -> None:
    pass
