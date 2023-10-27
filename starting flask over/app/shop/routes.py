from . import shop
from flask import render_template, redirect, request, url_for, flash
from .forms import ProductForm
from ..models import User, Product, db
from flask_login import current_user, login_required
from datetime import datetime
import requests as r


@shop.route('/product/create', methods=['GET', 'POST'])
@login_required
def create_product():
    form = ProductForm()
    if request.method == 'POST':
        if form.validate():
            title = form.title.data
            img_url = form.img_url.data
            description = form.description.data
            price = form.price.data

            product = Product(title, img_url, description, price)
            
            db.session.add(product)
            db.session.commit()

            flash('Successfully created a product!', 'success')

            return redirect(url_for('shop.feed'))
        
    return render_template('create-product.html', form=form)


@shop.route('/feed')
def feed():
    product = Product.query.order_by(Product.date_created.desc()).all()
    return render_template('feed.html', product=product)

@shop.route('/people')
@login_required
def people_page():
    users = User.query.order_by(User.username).filter(User.username != current_user.username).all()
    current_user.get_following()
    return render_template('people.html', users=users)

@shop.route('/product/<product_id>')
@login_required
def ind_product(product_id):
    product = Product.query.get(product_id)
    return render_template("ind-post.html", p=product)

@shop.route('/product/update/<product_id>', methods=['GET', 'POST'])
@login_required
def update_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        flash('That product does not exist', 'danger')
        return redirect(url_for('shop.feed'))
    if current_user.id != product.user_id:
        flash('You cannot edit another user\'s product', 'danger')
        return redirect(url_for('shop.ind_post', product_id=product_id))
    form = ProductForm()
    if request.method == 'POST':
        if form.validate():
            title = form.title.data
            img_url = form.img_url.data
            description = form.description.data
            price = form.price.data

            product.title = title
            product.img_url = img_url
            product.description = description
            product.price = price
            product.last_updated = datetime.utcnow()

            db.session.commit()
            flash('Successfully updated your product', 'success')
            return redirect(url_for('shop.ind_product', product_id=product_id))

    return render_template("update-product.html", p=product, form=form)


@shop.route('/product/delete/<product_id>', methods=['GET', 'POST'])
@login_required
def delete_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        flash('That product does not exist', 'danger')
        return redirect(url_for('shop.feed'))
    if current_user.id != product.user_id:
        flash('You cannot delete another user\'s product', 'danger')
        return redirect(url_for('shop.ind_post', product_id=product_id))

    db.session.delete(product)
    db.session.commit()
    flash('Successfully deleted your product!', 'success')
    return redirect(url_for('shop.feed'))


@shop.route('/like/<post_id>')
@login_required
def like(post_id):
    post = Product.query.get(post_id)
    if post:
        post.likers.append(current_user)
        db.session.commit()
    return redirect(url_for('shop.ind_post', post_id=post_id))

@shop.route('/unlike/<post_id>')
@login_required
def unlike(post_id):
    post = Product.query.get(post_id)
    if post:
        post.likers.remove(current_user)
        db.session.commit()
    return redirect(url_for('shop.ind_post', post_id=post_id))


@shop.route('/follow/<user_id>')
@login_required
def follow(user_id):
    user = User.query.get(user_id)
    if user:
        current_user.following.append(user)
        db.session.commit()
    return redirect(url_for('shop.people_page'))

@shop.route('/unfollow/<user_id>')
@login_required
def unfollow(user_id):
    user = User.query.get(user_id)
    if user:
        current_user.following.remove(user)
        db.session.commit()
    return redirect(url_for('shop.people_page'))


@shop.route('/news')
def news_page():
    url = f"https://newsapi.org/v2/everything?q=bikes&apiKey=4ba2cb57066b49e2b7a8f20f5e0f65c6&pageSize=20"
    res = r.get(url)
    if res.ok:
        data = res.json()
        articles = data['articles']
    return render_template('news.html', articles=articles)
