from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, jwt_required, create_access_token

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///ecommerce.db"
db = SQLAlchemy(app)
ma = Marshmallow(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

# Product Model
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=False)

# Order Model
class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey("product.id"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

# Payment Model
class Payment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey("order.id"), nullable=False)
    payment_method = db.Column(db.String(100), nullable=False)
    payment_status = db.Column(db.String(100), nullable=False)

# User Schema
class UserSchema(ma.Schema):
    class Meta:
        fields = ("id", "username", "email", "password")

# Product Schema
class ProductSchema(ma.Schema):
    class Meta:
        fields = ("id", "name", "price", "description")

# Order Schema
class OrderSchema(ma.Schema):
    class Meta:
        fields = ("id", "user_id", "product_id", "quantity")

# Payment Schema
class PaymentSchema(ma.Schema):
    class Meta:
        fields = ("id", "order_id", "payment_method", "payment_status")

# Register User
@app.route("/register", methods=["POST"])
def register_user():
    username = request.json["username"]
    email = request.json["email"]
    password = bcrypt.generate_password_hash(request.json["password"]).decode("utf-8")
    user = User(username=username, email=email, password=password)
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User  registered successfully"})

# Login User
@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]
    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id)
        return jsonify({"access_token": access_token})
    return jsonify({"message": "Invalid email or password"})

# Add Product
@app.route("/add_product", methods=["POST"])
def add_product():
    name = request.json["name"]
    price = request.json["price"]
    description = request.json["description"]
    product = Product(name=name, price=price, description=description)
    db.session.add(product)
    db.session.commit()
    return jsonify({"message": "Product added successfully"})

# Place Order
@app.route("/place_order", methods=["POST"])
def place_order():
    user_id = request.json["user_id"]
    product_id = request.json["product_id"]
    quantity = request.json["quantity"]
    order = Order(user_id=user_id, product_id=product_id, quantity=quantity)
    db.session.add(order)
    db.session.commit()
    return jsonify({"message": "Order placed successfully"})

# Make Payment
@app.route("/make_payment", methods=["POST"])
def make_payment():
    order_id = request.json["order_id"]
    payment_method = request.json["payment_method"]
    payment_status = request.json["payment_status"]
    payment = Payment(order_id=order_id, payment_method=payment_method, payment_status=payment_status)
    db.session.add(payment)
    db.session.commit()
    return jsonify({"message": "Payment made successfully"})

if __name__ == "__main__":
    app.run(debug=True)