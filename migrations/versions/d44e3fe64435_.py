"""empty message

Revision ID: d44e3fe64435
Revises: f6e487c0bca1
Create Date: 2024-02-28 23:27:00.530725

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd44e3fe64435'
down_revision = 'f6e487c0bca1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('full_name',
               existing_type=sa.VARCHAR(length=120),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.alter_column('full_name',
               existing_type=sa.VARCHAR(length=120),
               nullable=False)

    # ### end Alembic commands ###
